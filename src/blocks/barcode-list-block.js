import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'
import Quagga from 'quagga';
const WIDTH = 640;
const HEIGHT = 480;

Vue.component('barcode-list-block', {
    template: `<div class="barcode-list-block" :class="{stopped: isStopped}">
        <div class="toggle-light" :class="{selected: torchOn}" @click="toggleTorch">toggle light</div>
        <ul class="camera-list">
            <li v-for="camera in cameras" @click="selectCamera(camera.id)" :class="{selected: selectedCameraId=== camera.id}">
            {{camera.label}}
            </li>
        </ul>
        <div class="video-output">
            <div class="container" ref="container"></div>
            <canvas class="overlay" ref="canvas" width="${WIDTH}" height="${HEIGHT}"></canvas>
        </div>
        <div class="total">
            {{total.toFixed(2)}}€ total
        </div>
        <ul class="list">
            <li v-for="product in products">
                <span class="price">{{product.price.toFixed(2)}}€</span>
                <span class="name">{{product.name}}</span>
                <span class="remove" @click="removeProduct(product.code)">remove</span>
            </li>
        </ul>
    </div>`,
    props: ['id', 'config'],

    data() {
        return {
            status: C.UNINITIALIZED,
            isStopped: false,
            products: [],
            cameras: [],
            selectedCameraId: null,
            total: 0,
            torchOn: false
        }
    },
    async mounted() {
        await this.listCameras();
        this.lookedUpProducts = [];
        this.ctx = this.$refs.canvas.getContext('2d');

        Quagga.onDetected(this.onBarcodeDetected.bind(this));
        Quagga.onProcessed(this.onProcessed.bind(this));
        await this.startBarcodeReader();

    },
    methods: {
        selectCamera(id) {
            this.$data.selectedCameraId = id;
            Quagga.stop();
            this.startBarcodeReader();
        },
        updateTotal() {
            var total = 0;
            for (var i = 0; i < this.$data.products.length; i++) {
                total += this.$data.products[i].price;
            }
            this.$data.total = total;
            if (this.$props.config.code == this.$data.total) {
                this.destroy();
            }
        },
        removeProduct(code) {
            this.lookedUpProducts = this.lookedUpProducts.filter(c => {
                return c !== code;
            });
            this.$data.products = this.$data.products.filter(product => {
                return product.code !== code;
            });
            this.updateTotal();
        },
        toggleTorch() {
            const track = Quagga.CameraAccess.getActiveTrack();
            this.$data.torchOn = !this.$data.torchOn;
            track.applyConstraints({
                advanced: [{ torch: this.$data.torchOn }]
            });
        },
        async startBarcodeReader() {
            const config = {
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    constraints: {
                        width: WIDTH,
                        height: HEIGHT,
                        deviceId: this.$data.selectedCameraId
                    },
                    target: this.$refs.container    // Or '#yourElement' (optional)
                },
                locate: true,
                decoder: {
                    readers: ["ean_reader"],
                }
            };
            return new Promise(resolve => {
                Quagga.init(config, err => {
                    if (err) {
                        throw err;
                    }
                    Quagga.start();
                    resolve();
                });
            })
        },
        async listCameras() {
            const cameras = await navigator.mediaDevices.enumerateDevices();
            for (var i = 0; i < cameras.length; i++) {
                if (cameras[i].kind === 'videoinput') {
                    this.$data.cameras.push({
                        label: cameras[i].label,
                        id: cameras[i].deviceId
                    })
                }
            }
            this.$data.selectedCameraId = this.$data.cameras[0].id;
        },
        onProcessed(data) {
            this.clearCanvas();
            if (!data) {
                return;
            }

            if (data.boxes) {
                for (var i = 0; i < data.boxes.length; i++) {
                    this.drawBox(data.boxes[i]);
                }
            }

            if (data.codeResult) {
                this.drawResult(data);
            }
        },

        drawResult(data) {
            this.createBoxPath(data.box);
            this.ctx.strokeStyle = '#00FF00';
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(data.line[0].x, data.line[0].y);
            this.ctx.lineTo(data.line[0].x, data.line[0].y);
            this.ctx.strokeStyle = '#FF0000';
            this.ctx.stroke();
        },

        onBarcodeDetected(data) {
            this.addProduct(data.codeResult.code)
        },

        clearCanvas() {
            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        },

        createBoxPath(box) {
            this.ctx.beginPath();
            this.ctx.moveTo(box[0][0], box[0][1]);
            this.ctx.lineTo(box[1][0], box[1][1]);
            this.ctx.lineTo(box[2][0], box[2][1]);
            this.ctx.lineTo(box[3][0], box[3][1]);
            this.ctx.closePath();
        },

        drawBox(box) {
            this.createBoxPath(box);
            this.ctx.fillStyle = '#00FF0099';
            this.ctx.fill();
        },

        async addProduct(code) {
            if (this.lookedUpProducts.includes(code)) {
                return;
            }
            this.lookedUpProducts.push(code);

            for (var i = 0; i < this.$data.products.length; i++) {
                if (this.$data.products[i].code === code) {
                    return;
                }
            }
            const product = await this.dmLookup(code);

            if (product) {
                this.$data.products.push(product);
            }

            this.updateTotal();

        },
        async dmLookup(code) {
            const url = `https://product-search.services.dmtech.com/de/search?query=${code}&searchType=product&type=search`;
            const result = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const response = await result.json();
            const data = JSON.parse(response.contents);
            if (data.count === 0 || !data.products[0]) {
                return null;
            }

            return {
                code: code,
                name: data.products[0].name,
                price: data.products[0].price.value,
                image: data.products[0].imageUrlTemplates[0]
            }
        },
        drawMarkers(data) {
            clearTimeout(this.clearTimeout);
            this.clearTimeout = setTimeout(() => {
                this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            }, 1000);
            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

            // box
            this.ctx.beginPath();
            this.ctx.moveTo(data.box[0][0], data.box[0][1]);
            this.ctx.lineTo(data.box[1][0], data.box[1][1]);
            this.ctx.lineTo(data.box[2][0], data.box[2][1]);
            this.ctx.lineTo(data.box[3][0], data.box[3][1]);
            this.ctx.closePath();
            this.ctx.fillStyle = '#00FF0099';
            this.ctx.fill();

            // line
            this.ctx.beginPath();
            this.ctx.moveTo(data.line[0].x, data.line[0].y);
            this.ctx.lineTo(data.line[1].x, data.line[1].y);
            this.ctx.lineWidth = 6;
            this.ctx.strokeStyle = '#FF0000CC';
            this.ctx.stroke();
        },
        destroy() {
            this.$data.isStopped = true;
            baseBlock.setComplete(this);
            Quagga.stop();
        }
    }
});
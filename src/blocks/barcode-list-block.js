import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'
import Quagga from 'quagga';
const WIDTH = 640;
const HEIGHT = 480;

Vue.component('barcode-list-block', {
    template: `<div class="barcode-list-block" :class="{stopped: isStopped}">
        <div class="video-output">
            <div class="container" ref="container"></div>
            <canvas class="overlay" ref="canvas" width="${WIDTH}" height="${HEIGHT}"></canvas>
        </div>
        <ul class="list">
            <li v-for="product in products">
                <span class="code">{{product.code}}</span>
            </li>
        </ul>
    </div>`,
    props: ['id', 'config'],

    data() {
        return {
            status: C.UNINITIALIZED,
            isStopped: false,
            products: []
        }
    },
    async mounted() {
        this.ctx = this.$refs.canvas.getContext('2d');
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                constraints: {
                    width: WIDTH,
                    height: HEIGHT,
                },
                target: this.$refs.container    // Or '#yourElement' (optional)
            },
            locate: true,
            decoder: {
                readers: ["ean_reader"],
            },

        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            Quagga.start();
        });
        Quagga.onDetected(this.onBarcodeDetected.bind(this));

    },
    methods: {
        onBarcodeDetected(data) {
            console.log('detected', data);

            this.addProduct(data.codeResult.code)
            this.drawMarkers(data);
        },

        addProduct(code) {
            for (var i = 0; i < this.$data.products.length; i++) {
                if (this.$data.products[i].code === code) {
                    return;
                }
            }
            this.$data.products.push({
                code: code
            });
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
        }
    }
});
import Vue from 'vue'

import './blocks/text-block'
import './blocks/video-block'
import './blocks/code-input-block'
import './blocks/location-block'
import './blocks/foto-block'
import './blocks/barcode-list-block'

import GameController from './game/controller'
import C from './constants'

window.app = new Vue({
    data: {
        status: "ready",
        blocks: [],
        adminControlsOpen: false,
        gameOver: false
    },
    el: '#app-container',
    methods: {
        addBlock(id, type, config) {
            if (!type.endsWith('-block')) {
                type = type + '-block';
            }
            if (!this.$options.components[type]) {
                const types = Object.keys(this.$options.components).join(', ');
                throw new Error(`Unknown component ${type} - valid types are ${types}`);
            }
            for (var i = 0; i < this.blocks.length; i++) {
                if (this.blocks[i].id === id) {
                    return;
                }
            }
            this.blocks.push({
                id, type, config
            });
        },
        previous() {

        },
        next() {
            this.$children[this.$children.length - 1].destroy();
        },
        toggleAdminControls() {
            this.$data.adminControlsOpen = !this.$data.adminControlsOpen;
        }
    }
});

window.game = new GameController(window.app);
window.game.init();

//https://www.dm.de/search?query=4001499917349&searchType=product
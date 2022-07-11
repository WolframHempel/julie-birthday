import Vue from 'vue'

import './blocks/text-block'

import GameController from './game/controller'

window.app = new Vue({
    data: {
        status: "ready",
        blocks: []
    },
    el: '#app-container',
    methods: {
        addBlock(type, config) {
            if (!type.endsWith('-block')) {
                type = type + '-block';
            }
            if (!this.$options.components[type]) {
                const types = Object.keys(this.$options.components).join(', ');
                throw new Error(`Unknown component ${type} - valid types are ${types}`);
            }
            this.blocks.push({
                type, config
            });
        }
    }
});

window.game = new GameController(window.app);
window.game.init();

//https://www.dm.de/search?query=4001499917349&searchType=product
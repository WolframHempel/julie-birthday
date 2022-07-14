import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'

Vue.component('video-block', {
    template: `<div class="video-block">
        <div class="replay" :class="{visible: hasEnded}" @click="replay">replay</div>
        <video :src="config.src" ref="video" @ended="onEnded"></video>
    </div>`,
    props: ['id', 'config'],
    data() {
        return {
            status: C.UNINITIALIZED,
            hasEnded: false
        }
    },
    mounted() {
        this.init();
        this.isDestroyed = false;
    },
    methods: {
        init() {
            this.$data.status = C.INITALIZING;
            this.$refs.video.play();
        },
        replay() {
            this.$data.hasEnded = false;
            this.$refs.video.play();
        },
        onEnded() {
            this.destroy();
        },
        destroy() {
            if (this.isDestroyed) {
                return;
            }
            this.isDestroyed = true;
            this.$refs.video.pause();
            this.$data.hasEnded = true;
            baseBlock.setComplete(this);
        }

    }
});
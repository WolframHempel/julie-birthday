import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'

Vue.component('foto-block', {
    template: `<div class="foto-block" :class="{stopped: isStopped}">
      <video ref="video"></video>
      <div class="mask" :style="{backgroundImage: 'url('+config.maskUrl+')'}"></div>
    </div>`,
    props: ['id', 'config'],

    data() {
        return {
            status: C.UNINITIALIZED,
            isStopped: false
        }
    },
    async mounted() {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true })
        this.$refs.video.srcObject = this.stream;
        this.$refs.video.play();
        baseBlock.setComplete(this);
    },
    methods: {
        destroy() {
            this.stream.getTracks().forEach(track => {
                track.stop();
            });
            this.$data.isStopped = true;
        }
    }
});
import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'

Vue.component('foto-block', {
    template: `<div class="foto-block">
      <video ref="video"></video>
      <div class="mask" :style="{backgroundImage: 'url('+config.maskUrl+')'}">
      </div>
    </div>`,
    props: ['id', 'config'],

    data() {
        return {
            status: C.UNINITIALIZED,
        }
    },
    mounted() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                this.$refs.video.srcObject = stream;
                this.$refs.video.play();
                baseBlock.setComplete(this);
            })
            .catch(function (error) {
                console.log('error', error);
            });
    },
    methods: {
    }
});
import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'

Vue.component('location-block', {
    template: `<div class="location-block">
      <pre>{{geoDump}}</pre>
      <pre>{{deviceOrientationDump}}</pre>
    </div>`,
    props: ['id', 'config'],

    data() {
        return {

            status: C.UNINITIALIZED,
            geoDump: null,
            deviceOrientationDump: null
        }
    },
    mounted() {
        navigator.geolocation.watchPosition(this.onPosition.bind(this), this.onError.bind(this), {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
        window.addEventListener("deviceorientation", this.onOrientation, true);
    },
    methods: {
        onPosition(position) {
            const geoDump = {};
            for (var key in position.coords) {
                geoDump[key] = position.coords[key];
            }
            this.$data.geoDump = JSON.stringify(geoDump, null, '  ');

        },
        onOrientation(orientation) {
            this.$data.deviceOrientationDump = JSON.stringify({
                absolute: orientation.absolute,
                alpha: orientation.alpha,
                beta: orientation.beta,
                gamma: orientation.gamma
            }, null, '  ')
            console.log('orientation', orientation);
        },
        onError(error) {
            console.log('error', error);
        }
    }
});
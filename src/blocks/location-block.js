import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'

Vue.component('location-block', {
    template: `<div class="location-block">
      <span class="compass"><span :style="{transform:'rotate('+((360-angle)-90) +'deg)'}">></span></span>&nbsp;
      <span>distance {{targetDistance}}m</span>
    </div>`,
    props: ['id', 'config'],

    data() {
        return {
            status: C.UNINITIALIZED,
            targetAngle: 0,
            targetDistance: 0,
            northAngle: 0,
            angle: 0
        }
    },
    mounted() {
        this.watchId = navigator.geolocation.watchPosition(this.onPosition.bind(this), this.onError.bind(this), {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
        window.addEventListener("deviceorientation", this.onOrientation, true);
    },
    methods: {
        onPosition(position) {
            const lat1 = position.coords.latitude;
            const lon1 = position.coords.longitude;
            const lat2 = this.$props.config.latitude;
            const lon2 = this.$props.config.longitude;
            this.$data.targetAngle = Math.atan2(lon2 - lon1, lat2 - lat1) * 180 / Math.PI;
            this.$data.targetDistance = this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
            if (this.$data.targetDistance < this.$data.targetReachedDistance) {
                this.destroy();
            }
        },

        destroy() {
            navigator.geolocation.clearWatch(this.watchId);
            window.removeEventListener("deviceorientation", this.onOrientation, true);
            baseBlock.setComplete(this);
        },
        getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            function deg2rad(deg) {
                return deg * (Math.PI / 180)
            }
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return Math.round(d * 1000);
        },

        onOrientation(orientation) {
            this.$data.northAngle = orientation.webkitCompassHeading || Math.abs(orientation.alpha - 360);
            var a = this.$data.northAngle - this.$data.targetAngle;
            if (a > 360) {
                a = a - 360;
            } else if (a < 0) {
                a = 360 - a;
            }

            this.$data.angle = a;
        },
        onError(error) {
            console.log('error', error);
        }
    }
});
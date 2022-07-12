import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'

Vue.component('location-block', {
    template: `<div class="location-block">
      <div>targetAngle: {{targetAngle}}</div>
      <div>targetDistance: {{targetDistance}}</div>
      <div>northAngle: {{northAngle}}</div>
      <div>angle: {{angle}}</div>
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
        navigator.geolocation.watchPosition(this.onPosition.bind(this), this.onError.bind(this), {
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
            console.log(lat1, lon1, lat2, lon2);
            this.$data.targetAngle = Math.atan2(lat1 - lat2, lon1 - lon2) * 180 / Math.PI;
            this.$data.targetDistance = this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
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
            return d;
        },

        onOrientation(orientation) {
            this.$data.northAngle = orientation.webkitCompassHeading || Math.abs(orientation.alpha - 360);
            this.$data.angle = this.$data.targetAngle - this.$data.northAngle;
        },
        onError(error) {
            console.log('error', error);
        }
    }
});
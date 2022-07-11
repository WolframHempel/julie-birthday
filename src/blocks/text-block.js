import Vue from 'vue'

Vue.component('text-block', {
    template: `<div class="text-block">
        <span v-for="c in chars" class="fade-in" @animationend="onAnimationEnd">{{c}}</span>
    </div>`,
    props: ['config'],
    data() {
        return {
            chars: [],
            index: 0
        }
    },
    mounted() {
        this.chars.push(this.$props.config.message[0]);
    },
    methods: {
        onAnimationEnd(e) {
            this.$data.index++;
            if (this.$data.index > this.$props.config.message.length) {
                return;
            }
            this.chars.push(this.$props.config.message[this.$data.index])

        }
    }
});
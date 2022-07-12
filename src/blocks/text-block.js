import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'

Vue.component('text-block', {
    template: `<div class="text-block" @click="onClick" :class="config.styles || []">
        <span v-for="c in chars" class="fade-in" @animationend="onAnimationEnd">{{c}}</span>
    </div>`,
    props: ['id', 'config'],
    data() {
        return {
            chars: [],
            index: 0,
            status: C.UNINITIALIZED
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$data.status = C.INITALIZING;
            this.chars.push(this.$props.config.message[0]);
        },
        onAnimationEnd() {
            this.$data.index++;
            if (this.$data.index > this.$props.config.message.length) {
                baseBlock.setInitialized(this);
                if (!this.$props.config.onClickNext) {
                    baseBlock.setComplete(this);
                }
                return;
            }
            this.chars.push(this.$props.config.message[this.$data.index])
        },

        onClick() {
            if (typeof this.$props.config.onClick === 'function') {
                this.$props.config.onClick();
            }

            if (this.$props.config.onClickNext) {
                baseBlock.setComplete(this);

            }
        }
    }
});
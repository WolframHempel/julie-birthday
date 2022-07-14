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
        this.isDestroyed = false;
        this.init();
    },
    methods: {
        init() {
            this.$data.status = C.INITALIZING;
            this.chars.push(this.$props.config.message[0]);
        },
        onAnimationEnd() {
            if (this.isDestroyed) {
                return;
            }
            this.$data.index++;
            if (this.$data.index > this.$props.config.message.length) {
                baseBlock.setInitialized(this);
                if (!this.$props.config.onClickNext) {
                    this.destroy();
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
                this.destroy();
            }
        },

        destroy() {
            this.isDestroyed = true;
            for (var i = this.$data.index + 1; i < this.$props.config.message.length; i++) {
                this.chars.push(this.$props.config.message[i])
            }

            baseBlock.setComplete(this);
        }
    }
});
import Vue from 'vue'
import C from '../constants'
import baseBlock from './base-block'

Vue.component('code-input-block', {
    template: `<div class="code-input-block">
       <input 
        type="text" 
        v-model="codeModel" 
        ref="input"
        :disabled="code === config.solution"
        :maxlength="maxLength"
        >
       <div class="placeholder">{{placeholder}}</div>
       <div class="solution" v-if="code.length === config.solution.length">
            <div class="valid" v-if="code === config.solution">valid code...</div>
            <div class="invalid" v-if="code != config.solution">invalid code!</div>
       </div>
    </div>`,
    props: ['id', 'config'],
    watch: {
        code(value) {
            if (value === this.$props.config.solution) {
                baseBlock.setComplete(this);
            }
        }
    },
    data() {
        const maxLength = this.$props.config.solution.length;
        return {
            codeModel: '',
            maxLength: maxLength,
            placeholder: '__________________________'.substring(0, maxLength),
            status: C.UNINITIALIZED
        }
    },
    computed: {
        code() {
            return this.codeModel.toUpperCase();
        }
    },
    mounted() {
        requestAnimationFrame(() => {
            this.$refs.input.focus();
        })
    }
});
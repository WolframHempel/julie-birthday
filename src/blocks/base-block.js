import C from '../constants'

export default {
    setInitialized(block) {
        block.$data.status = C.INITIALIZED;
        block.$root.$emit('block-initialised', block.$props.id);
    },

    setComplete(block) {
        block.$data.status = C.COMPLETE;
        block.$root.$emit('block-complete', block.$props.id);
    }
}
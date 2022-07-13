import manifest from "./manifest";
import C from '../constants'

export default class GameController {
    constructor(app) {
        this.app = app;
        this.steps = Object.keys(manifest);
    }

    init() {
        this.app.$on('block-complete', this.onBlockComplete.bind(this));
        this.next();
    }

    onBlockComplete() {
        const currentId = this.getCurrentId();
        if (manifest[currentId].onComplete) {

            var block;

            if (manifest[currentId].onComplete.destroy) {
                block = this.getBlockById(manifest[currentId].onComplete.destroy);
                if (!block) {
                    throw new Error(`block with id ${manifest.onComplete.destroy} not found`);
                }

                block.destroy();
            }
        }
        this.next();

    }

    next() {
        const currentId = this.getCurrentId();
        const id = this.getNextId(currentId);
        if (!id) {
            return;
        }
        this.app.addBlock(id, manifest[id].type, manifest[id].config);
    }

    getBlockById(id) {
        for (var i = 0; i < this.app.$children.length; i++) {
            if (this.app.$children[i].$props.id === id) {
                return this.app.$children[i];
            }
        }
        return null;
    }

    getCurrentId() {
        if (this.app.$children.length === 0) {
            return null;
        }
        for (var i = 0; i < this.app.$children.length; i++) {
            if (this.app.$children[i].status !== C.COMPLETE) {
                return this.app.$children[i].$props.id;
            }
        }
        return this.steps[this.app.$children.length - 1];
    }

    getNextId(id) {
        if (id === null) {
            return this.steps[0];
        }

        const index = this.steps.indexOf(id);
        return this.steps[index + 1] || null;
    }
}
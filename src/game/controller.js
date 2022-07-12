import manifest from "./manifest";
import C from '../constants'

export default class GameController {
    constructor(app) {
        this.app = app;
        this.steps = Object.keys(manifest);
    }

    init() {
        this.app.$on('block-complete', this.next.bind(this));
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

    getCurrentId() {
        if (this.app.$children.length === 0) {
            return null;
        }
        for (var i = 0; i < this.app.$children.length; i++) {
            if (this.app.$children[i].status !== C.COMPLETE) {
                return this.app.$children[i].$props.id;
            }
        }
        return this.steps[i - 1];
    }

    getNextId(id) {
        if (id === null) {
            return this.steps[0];
        }

        const index = this.steps.indexOf(id);
        return this.steps[index + 1] || null;
    }
}
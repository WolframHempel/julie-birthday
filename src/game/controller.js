export default class GameController {
    constructor(app) {
        this.app = app;
    }

    init() {
        this.app.addBlock('text', {
            message: 'wakey wakey Julia...'
        })
    }
}
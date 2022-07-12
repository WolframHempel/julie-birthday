export default {
    'wakey': {
        id: 'wakey',
        type: 'text',
        config: {
            message: 'wakey wakey Julia...'
        }
    },
    'imAwake': {
        type: 'text',
        config: {
            message: 'I\'m awake!',
            styles: ['clickable'],
            onClickNext: true
        }
    },
    'anonymousVideo': {
        type: 'video',
        config: {
            src: '/assets/video/test-video.mp4'
        }
    }
}
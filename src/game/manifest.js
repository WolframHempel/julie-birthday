export default {
    'naturkundemuseum': {
        type: 'location',
        config: {
            lat: 52.5299926764862,
            lng: 13.379472046059915
        }
    },
    'wakey': {
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
    },
    'magazineCodeQuestion': {
        type: 'text',
        config: {
            message: 'wakey wakey Julia...'
        }
    },
    'magazineCodeInput': {
        type: 'code-input',
        config: {
            solution: '2344'
        }
    },
}
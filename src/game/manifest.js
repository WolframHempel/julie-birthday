export default {
    'naturkundemuseum': {
        type: 'location',
        config: {
            latitude: 52.532565898454614,
            longitude: 13.388635600128081,
            targetReachedDistance: 30
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
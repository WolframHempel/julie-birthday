export default {
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
            src: '/assets/video/anonymous-video.mp4'
        }
    },
    'recipeText': {
        type: 'text',
        config: {
            message: `Let us begin with a little game. A game that's played on the border between the physical world and the digital world. A simple game. We give you hints - you give us codes. Understood?`
        }
    },
    'recipeTextConfirm': {
        type: 'text',
        config: {
            message: 'Yes, I understand.',
            styles: ['clickable'],
            onClickNext: true
        }
    },
    'recipeTextHint': {
        type: 'text',
        config: {
            message: `Good. Here are the hints for the first code: So schmeckt Heimat - Falsche Häschen zu Feldmöhrchen: Parsley – Thyme – Eggs - Carrots`
        }
    },
    'recipeCodeInput': {
        type: 'code-input',
        config: {
            solution: '6721'
        }
    },
    'goToDmHint': {
        type: 'text',
        config: {
            message: `A nice start. Let's walk a little, shall we?`
        }
    },

    'goToDm': {
        type: 'location',
        config: {
            latitude: 52.530890814900715,
            longitude: 13.384461645473344,
            targetReachedDistance: 20
        }
    },

    'scanHint': {
        type: 'text',
        config: {
            message: `Good, lift's the spirit, doesn't it? Next, we would like you to do a little math. What is 7.25 + 6.30? But what's that? No code entry this time? Silly you - that'd be way too easy. Instead, we'd like you to go in and scan articles that add up to the answer. `
        }
    },

    'dmList': {
        type: 'barcode-list',
        config: {
            code: 13.55
        }
    },

    'goToGotthelfHint': {
        type: 'text',
        config: {
            message: `Hm - you are performing well, but there is much more to learn. Go here:`
        }
    },

    'goToGotthelf': {
        type: 'location',
        config: {
            latitude: 52.530077611677996,
            longitude: 13.380809727153448,
            targetReachedDistance: 20
        }
    },

    'gottHelfHint': {
        type: 'text',
        config: {
            message: `Find the code. Here's a little help:`
        }
    },

    'fotogotthelf': {
        type: 'foto',
        config: {
            maskUrl: '/assets/img/gotthelf-mask.png'
        }
    },
    'gotthelfCodeInput': {
        type: 'code-input',
        onComplete: {
            destroy: 'fotogotthelf'
        },
        config: {
            solution: 'GOTTHELF'
        }
    },

    'goToRubyHint': {
        type: 'text',
        config: {
            message: `We liked this one a lot. Let's do it again. Go here:`
        }
    },

    'rubyLocation': {
        type: 'location',
        config: {
            latitude: 52.53182028115971,
            longitude: 13.384504526703928,
            targetReachedDistance: 30
        }
    },

    'rubyHint': {
        type: 'text',
        config: {
            message: `You know the drill. Good luck:`
        }
    },

    'rubyFoto': {
        type: 'foto',
        config: {
            maskUrl: '/assets/img/ruby-mask.png'
        }
    },
    'rubyCodeInput': {
        type: 'code-input',
        onComplete: {
            destroy: 'rubyFoto'
        },
        config: {
            solution: 'RUBY'
        }
    },

    'espressoGotoHint': {
        type: 'text',
        config: {
            message: `Very well done. Time for a break. Go here:`
        }
    },

    'espressoLocation': {
        type: 'location',
        config: {
            latitude: 52.53307886976373,
            longitude: 13.38748361755495,
            targetReachedDistance: 30
        }
    },

    'espressoHint': {
        type: 'text',
        config: {
            message: `You earned yourself a refreshment. Why don't you go inside and get yourself a Danish Tea? (And also a large cappuccino to take away, which is very important for the game.)`
        }
    },
    'espressoConfirm': {
        type: 'text',
        config: {
            message: 'I got the tea.',
            styles: ['clickable'],
            onClickNext: true
        }
    },
    'finalHint': {
        type: 'text',
        config: {
            message: `Excellent. This is all the guidance we will provide. From here on, it's up to you. Prove us you are worthy. (We will now format your phone's internal storage to ensure our communication can't be traced. Good Luck!)`
        }
    },
    'gameOverConfirm': {
        type: 'text',
        config: {
            message: 'OK',
            styles: ['clickable'],
            onClickNext: true
        }
    },
}
var Twitter = require('node-tweet-stream'),
    t = new Twitter({
        consumer_key: 'aK9jDhjmQLKBIoZx1YsTERGjn',
        consumer_secret: 'YguvrdhJR8IELrACx9EEEDqhOJHhk2nLw4aNa9Gd02xfpt57K2',
        token: '767427201293705216-srBLqem7r5UyAP4yj1A9o9GEVQ00v8n',
        token_secret: 'Xyr1JIboDoxR992lGPAj4eEqoqRbk9EzyDy2T4QhevAMt'
    });
    t.on('tweet', function(tweet) {
        console.log('tweet');
    })

    t.track('trump');

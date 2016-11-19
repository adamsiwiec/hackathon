


var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key: 'abnmh1INtFckAHTxt8Y8bXEWa',
    consumer_secret: 'AXLq8s6ZQI1OSMYuMcQ5J1xfm2s8i6vFJmFsgfTGEsXqiJnLs7',
    token: '767427201293705216-wlhE8wiLim1MSELq7GmOq16P6g5TNxu',
    token_secret: 'rP5MIA6gt0nJNLHMGuVuoYTPJmUgq1dfT3tqmUyEQy8lM'
  })

  tweetcount = 0;

t.on('tweet', function (tweet) {
  console.log('tweet received', tweet);
  tweetcount += 1;
  console.log(tweetcount);


})

t.on('error', function (err) {
  console.log('Oh no')
})

t.track('nwahackathon');

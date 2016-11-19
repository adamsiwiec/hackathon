var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('node-tweet-stream'),
    t = new Twitter({
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
        token: process.env.token,
        token_secret: process.env.token_secret
    });

var tweetcount = 0;
var participants = [];
var num_part = 0;
var payment = 0.01;

t.on('tweet', function(tweet) {
    tweetcount += 1;
    io.emit('tweet count', tweetcount);
    io.emit('new tweet', tweet);

    if (participants.indexOf(tweet.user.screen_name) === -1) {
        participants.push(tweet.user.screen_name);
        num_part += 1;
    }
    io.emit('participants', num_part);

    if (tweetcount >= 5 && tweetcount <= 10) {
        payment = 0.02;
        io.emit('fundraise', payment);
    } else if (tweetcount >= 11 && tweetcount <= 25) {
        payment = 0.03;
        io.emit('fundraise', payment);
    } else if (tweetcount >= 26 && tweetcount <= 50) {
        payment = 0.04;
        io.emit('fundraise', payment);
    }
})

t.on('error', function(err) {
    console.log('Oh no')
})

t.track('prince');


app.use('/', express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/hackathon', function(req, res) {
    res.sendFile(__dirname + '/event.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
io.on('connection', function(socket) {
    io.emit('fundraise', payment);
    io.emit('tweet count', tweetcount);
    io.emit('participants', num_part)
});


http.listen(3000, function() {
    console.log('listening on *:3000');
});

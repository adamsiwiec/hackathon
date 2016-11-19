var express = require('express');
var app = express();
var http = require('http').Server(app);
var hn = require('hacker-news-api');
var bodyParser = require('body-parser');
var compression = require('compression');





app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.use('/', express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use(compression());

app.get('/hackathon', function(req, res) {

    if (!req.query.keywords) {
        res.json([]);
    } else {
        var curated = [];
        var key = req.query.keywords;
        var keywords = key.split(' ');
        hn.story().since('past_24h', function(error, data) {
            if (error) throw error;
            for (var i = 0; i < data.hits.length; i++) {
                var splitUp = data.hits[i].title.split(' ');
                for (var k = 0; k < keywords.length; k++) {
                    if (splitUp.indexOf(keywords[k]) !== -1) {
                         var temp = [data.hits[i].url, data.hits[i].title];
                        curated.push(temp);
                        break;
                    }
                    if (data.hits[i].title.toLowerCase().indexOf(keywords[k].toLowerCase()) !== -1) {
                        var temp = [data.hits[i].url, data.hits[i].title]
                        curated.push(temp);
                        break;

                }


                }

            }
            if (curated.length > 6) {
                do {
                    curated.pop()

                } while (curated.length > 6)


            }
            res.json(curated);
            console.log(curated);
        });
    }
});


var hndata = [];





http.listen(app.get('port'), function() {
    console.log('listening on *:3000');
});

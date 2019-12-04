var Twit = require('twit');
var config = require('./config.json')
var twitConf = require('./twitter.js');
var T = new Twit(twitConf);

console.log('Bot has started!')

var getDifferenceDays = (firstDate, secondDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hoursminutesseconds*milliseconds
    /*const firstDate = new Date(2019, 1, 12);
    const secondDate = new Date(2019, 1, 22);*/

    const diffDays = Math.ceil((secondDate.getTime()-firstDate.getTime())/(oneDay))
    return diffDays;
}

//https://stackoverflow.com/questions/24741530/in-javascript-how-can-i-have-a-function-run-at-a-specific-time heheheheh
setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 15 && date.getMinutes() === 17){ // Check the time
        date.setMonth(date.getMonth() + 1)
        var days = getDifferenceDays(date, new Date(2020, 1, 17))
        tweet(days)
    }
}, 60000);

function tweet(days){
    var tweetText = `Skeppy's birthday is in ${days} days!`;
    console.log(tweetText)
    T.post('statuses/update', { status: tweetText }, function(err, data, response) {
        console.log(data)
    })
    return tweetText;
}

const http = require('http');
const express = require('express');
const app = express();
app.use(express.json());
app.get('/', function(req, res) {
    res.type('json')
    if(req.query.pass != config.pass)
        return res.end(JSON.stringify({error: 401, message: "not authorized"}));
    
    var response = tweet(req.query.days)

    res.end(JSON.stringify({success: true, tweet: response}));
  });

const server = http.createServer(app);
const port = 1515;
server.listen(port);
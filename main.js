var Twit = require('twit');

var config = require('./config.js');
var T = new Twit(config);

var getDifferenceDays = (firstDate, secondDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hoursminutesseconds*milliseconds
    /*const firstDate = new Date(2019, 1, 12);
    const secondDate = new Date(2019, 1, 22);*/

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
}

//https://stackoverflow.com/questions/24741530/in-javascript-how-can-i-have-a-function-run-at-a-specific-time heheheheh
setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 14 && date.getMinutes() === 0){ // Check the time
        var days = getDifferenceDays(date, new Date(2020, 1, 17))
        var tweet = `Skeppy's birthday is in ${days} days!`;
        console.log(tweet)
        T.post('statuses/update', { status: tweet }, tweeted);
    }
}, 60000);
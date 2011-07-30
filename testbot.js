//Channel for testday
var CHANNEL ='#testbot',
    ETHERPAD ='(Check channel topic)',
    irc = require('irc'),
    redislib = require("redis"),
    redis = redislib.createClient()

var client = new irc.Client('irc.mozilla.org', 'testbotowen', {
    channels: [CHANNEL],
});

console.log('hello - might be connected');

client.addListener('message', function (from, to, message) {
/*
    console.log(from + ' => ' + to + ': ' + message);
    client.say(CHANNEL, message);*/
});

client.addListener('join'+CHANNEL, function (nick) {
    client.say(CHANNEL, "Welcome to "+CHANNEL+" "+nick+"! Please feel free to check out the etherpad at "+ETHERPAD+" or ask anyone questions for information on how to get started");
    console.log("Welcomed "+nick);
});

client.addListener('topic', function (channel, topic, nick) {
    var words = topic.split(' ');
    for (i in words) {
        if(words[i].search(/etherpad\.mozilla\.com:9000/)>0){
            ETHERPAD=words[i];
        }
    }
});

//REDIS
/*
redis.on("error", function (err) {
    console.log("Redis connection error to " + redis.host + ":" + redis.port + " - " + err);
});


var redis_get= function(key,callback){
    //Asyncronous Get Wrapper for redis
    redis.GET(key, function(err, res){
        callback(res);
    });
}

function set_playlist(ID,playlist){
    redis.SET('playlist:'+ID,playlist);
}*/
//Channel for testday
var CHANNEL ='#testbot',
    ETHERPAD ='(Check channel topic)',
    irc = require('irc')//,
    //redislib = require("redis"),
    //redis = redislib.createClient()

var client = new irc.Client('irc.mozilla.org', 'testbotowen', {
    channels: [CHANNEL],
});

//"database"
var joined = []

console.log('hello - might be connected');

client.addListener('message', function (from, to, message) {
/*
    console.log(from + ' => ' + to + ': ' + message);
    client.say(CHANNEL, message);*/
});


setInterval(function(){
    joined=[]
}, 604800000)//one week

client.addListener('join'+CHANNEL, function (nick) {
    for (i in joined){
        if (foo[i]=='ba'){
            client.say(CHANNEL, "Welcome to "+CHANNEL+" "+nick+"! Please feel free to check out the etherpad at "+ETHERPAD+" or ask anyone questions for information on how to get started");
            joined.push(nick);
            console.log("Welcomed "+nick);
            break;
        }
    }
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
*/


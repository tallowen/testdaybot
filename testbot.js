//Channel for testday
var CHANNEL ='#testbot',
    ETHERPAD ='(Check channel topic)',
    irc = require('irc'),
    utils = require('./utils.js'),
    http = require('http');

var client = new irc.Client('irc.mozilla.org', 'testdaybot', {
    userName: 'testdaybot',
    realName: 'Owens testdaybot @ github.com/highriseo/testdaybot',
    port: 6697,
    debug: false,
    showErrors: false,
    autoRejoin: true,
    autoConnect: true,
    channels: [CHANNEL],
    secure: true 
});


client.addListener('message'+CHANNEL, function (from, message) {
    if(message.match(/\?/)){
        utils.tell_moderators(from+" asked: "+message,client);
    }
});

client.addListener('join'+CHANNEL, function (nick) {
    if (!utils.seen(nick)){
        client.say(CHANNEL, "Welcome to "+CHANNEL+" "+nick+"! Please feel free to check out the etherpad at "+ETHERPAD+" or ask anyone questions for information on how to get started");
        utils.joined.push(nick);
    }
});

client.addListener('topic', function (channel, topic, nick) {
    var words = topic.split(' ');
    for (i in words) {
        if(words[i].match(/etherpad\.mozilla\.com:9000/)){
            ETHERPAD=words[i];
        }
    }
});

client.addListener('pm', function (nick, text) {
    if (text=='moderate'){
        utils.moderators[nick]=true;
        client.say(nick, "You are now moderating")
    }
    if (text=='unmoderate'){
        utils.moderators[nick]=false;
        client.say(nick, "You are no longer moderating")
    }
    if (text=='status'){
        if (utils.moderators[nick]==true){
            client.say(nick, "You are moderating");
        }else{
            client.say(nick, "You are not moderating")
        }
    }
    if (text=='help'){
        client.say(nick, "Hello! I am the testday bot. I am here to help make testdays run more smoothly.");
        client.say(nick,"I respond to commands only in a PM. Here are the commands I know:");
        client.say(nick,"    'moderate' - Adds you to the list of moderators. You will be pinged when various events occur.");
        client.say(nick,"    'unmoderate' - stop testdaybot from notifying you");
        client.say(nick,"    'status' - see weather you are a moderator or not");
        client.say(nick,"    'help' - see this information");
    }
});

//make server to keep heroku happy
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('IRC bot at '+CHANNEL+' on irc.mozilla.org\n');
}).listen(1337);


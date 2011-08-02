//Channel for testday
var CHANNEL ='#testbot',
    ETHERPAD ='(Check channel topic)',
    irc = require('irc'),
    utils = require('utils')

var client = new irc.Client('irc.mozilla.org', 'testbotowen', {
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
    if(message.search(/\?/)>=0){
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
        if(words[i].search(/etherpad\.mozilla\.com:9000/)>=0){
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
});


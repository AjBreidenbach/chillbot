const Discord = require('discord.js');
const client = new Discord.Client(); 
const messageHook = require('./message-hooks.js');

client.on('ready', _ => {
	console.log(`Logged in as ${client.user.tag}!`);
});

function subreddit(msg) {
	if (msg.author.username == 'test_bot') return false;
	var patt = /r\/\w+/i;
	var matches = msg.content.match(patt);
	if (matches === null || matches.length < 0) return false;
	msg.resp(
			matches.map( m => `https://reddit.com/${m}` )
			);
	return true;
}

function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

client.on('message', msg => {
	if (subreddit(msg)) return;
	messageHook(msg);
});

client.on('guildMemberAdd', mem => {
	mem.guild.channels.find('name', 'general').send('Welcome to Chat & Chill. Be sure to check out the rules in <#418355341735231488> and have fun!', {reply: mem});
	console.log('member added?');
});

client.on('guildMemberRemove', mem => {
	mem.guild.channels.find('name', 'general').send('Has left the server.', {reply: mem});
	console.log('member removed');
});

client.login('MzIwMjIyNTIwODQwMjkwMzA0.DXzdQQ.0gm_Nc-7KqEYERNOAsI8TqjHfIg');

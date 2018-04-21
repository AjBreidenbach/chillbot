const Discord = require('discord.js');
const urban = require('./urban.js');

Discord.Message.prototype.args = function(index) {
	return (index === undefined) ?
		this.content.split(' ').slice(1) :
		this.content.split(' ')[index + 1];
}

Discord.Message.prototype.cmd = function() {
	return (this.content[0] == '-') ?
		this.content.split(' ')[0].substring(1) : undefined;
}

Discord.Message.prototype.resp = function(obj) {
	console.log(obj);
	this.reply(obj);
}

Array.prototype.rand = function() {
	return this[Math.floor(Math.random() * this.length)]

}

const eightBall = [
	'It is certain',
	'As I see it, yes',
	'Reply hazy try again',
	"Don't count on it",
	'It is decidedly so',
	'Most likely',
	'Ask again later',
	'My reply is no',
	'Without a doubt',
	'Outlook good',
	'Better not tell you now',
	'My sources say no', 
	'Yes definitely',
	'Yep',
	'Cannot predict now',
	'Outlook not so good',
	'You may rely on it',
	'Signs point to yes',
	'Concentrate and ask again',
	'Very doubtful',
	'Fuck you, get over yourself'
]

const help = {
	ping: 'echoes back',
	'8ball': 'does magic',
	help: 'this command'
}

const goodResp = [
	'<:luv:419938325714173963>',
	'<:ayy:420010946027847680>'
]

const commands = {
	help: (msg) =>{
		msg.reply('8ball, ping, ascii');
	},
	rand: (msg) => {
		msg.resp(msg.args().rand());
	},
	ping: (msg) => {
		msg.reply('Pong!');
	},
	log: (msg) => {
		console.log(msg.args());
	},
	'8ball': (msg) => {
		msg.resp(
				eightBall.rand()
			)
	},
	ascii: (msg) => {
		msg.resp(
				msg.args().length > 0 ?
				msg.args().map(x => String.fromCharCode(parseInt(x, 2)))
					.reduce( (acc, cur) => '' + acc + cur )
				: 'no value supplied'
			)
	},
	master: (msg) => {
		msg.resp(
				msg.author.username == 'aj_breidenbach'?
				'you are the master' :
				'the master is <@292677584859168768>');
	},
	permissions: (msg) => {
		if (! msg.guild) return;
		var permissions = msg.guild.members
			.find('nickname', 'Chill Bot')
			.permissions
			.serialize();

		for (p in permissions) {
			console.log(`${p}: ${permissions[p]}`)
		}
	},
	good: (msg) => {
		msg.reply(goodResp.rand());
	},
	bad: (msg) => {
		msg.reply('<:rage:419939607229235210>');
	},
	stupid: (msg) => {
		msg.reply(':middle_finger:');
	},
	right: (msg) => {
		msg.resp(
				msg.author.username == 'aj_breidenbach'?
				':thumbsup:' :
				':thinking:'
				);
	},
	ud: (msg) => {
		urban.term(msg);
	},
	udrand: (msg)=> {
		urban.rand(msg);
	},
	celsius: (msg) => {
		msg.resp(
				msg.args().length > 0?
				((parseInt(msg.args(0)) -32) * 5 / 9) :
				'no value supplied'
				)
	}
}

module.exports = function(msg) {
	if (msg.cmd() === undefined) return;
	if (!(msg.cmd() in commands)) {
		msg.reply('command not found');
		return;
	}
	console.log(
			`${msg.author} has called {${msg.cmd()}} with args {${msg.args()}}`
			)
	commands[msg.cmd()](msg);
}

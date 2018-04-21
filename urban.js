const ud = require('./urban-dictionary');


module.exports = {
	term: function(msg) {
		var numEntries = 1;
		var args = msg.args();
		if (args.length < 1) return;
		if (args.length > 1) {
			numEntries = parseInt(args[0]);
			if (isNaN(numEntries)) {
				numEntries = 1;
				args = args.reduce( (acc, n) => acc + ' ' + n );
			} else {
				args = args.slice(1).reduce( (acc, n) => acc + ' ' + n );
				console.log(`args = ${args}`);
			}
		}

		ud.term(
			args,
			function(error, entries, tags, sounds) {
				if(error) {
					msg.resp(error.message);
				} else {
					msg.resp(
						entries
						.slice(0, numEntries)
						.map( e => `\n${e.word}: ${e.definition}` )
						.reduce( (acc, e) => acc + '\n---' + e )
					);
				}
			});
	},
	rand: function (msg) {
		ud.random(function(error, entry) {
			if(error){
				msg.resp(error.message);
			} else {
				msg.resp(`\n${entry.word}: ${entry.definition}`);
			}
		});

	}
}

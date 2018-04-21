'use strict'

const http = require('http')
const request = require('request');

var methods = {}
var randomCache = []

function get (url, callback) {

	request.get({
		url: url,
		json: true,
		headers: {'User-Agent': 'request'}
	}, (err, res, data) => {
		if (err) {
			callback(err);
		} else if (res.statusCode !== 200) {
			console.log('Status:', res.statusCode);
		} else {
			callback(null, data);
		}
	});
}

methods.defid = function defid (id, callback) {
	get('http://api.urbandictionary.com/v0/define?defid=' + id, function (error, result) {
		if (error) {
			callback(error)
			return
		}

		if (!result || result.result_type !== 'exact') {
			callback(new Error('No result found.'))
			return
		}

		callback(null, result.list[0], result.tags, result.sounds)
	})
}

methods.random = function random (callback) {
	if (!randomCache[0]) {
		get('http://api.urbandictionary.com/v0/random', function (error, result) {
			if (error) {
				callback(error)
				return
			}
			randomCache = result.list
			callback(null, randomCache[0])
			randomCache.splice(0, 1)
		})
	} else {
		callback(null, randomCache[0])
		randomCache.splice(0, 1)
	}
}

methods.term = function term (word, callback) {
	get('http://api.urbandictionary.com/v0/define?term=' + encodeURIComponent(word), function (error, result) {
		if (error) {
			console.log('error here')
			callback(error)
			return
		}

		if (!result || result.result_type !== 'exact') {
			callback(new Error(word + ' is undefined.'))
			return
		}

		callback(null, result.list, result.tags, result.sounds)
	})
}


module.exports = methods

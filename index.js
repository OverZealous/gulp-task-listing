/*jshint node:true */

"use strict";

var colors = require('chalk');
var gulp = require('gulp');


var filter = function(inc) {
		return function(n) {
			var hasDash = n.search(/[-_]/) !== -1;
			return inc&&hasDash || !inc&&!hasDash;
		}
	},
	header = function(text) {
		console.log('');
		console.log(colors.gray(text));
		console.log('------------------------------');
	};

module.exports = function() {
	var k = Object.keys(gulp.tasks).sort();

	header('Main Tasks');
	
	k.filter(filter(false)).forEach(function(name) {
		console.log('    '+colors.cyan(name));
	});

	header('Sub Tasks');
	
	k.filter(filter(true)).forEach(function(name) {
		console.log('    '+name);
	});

	console.log('');
};


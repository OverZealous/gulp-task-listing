/*global describe, it*/
"use strict";

var fs = require('fs'),
	gulp = require('gulp'),
	taskListing = require('../');

require('should');
require("mocha");

describe('gulp-task-listing - basic functions', function() {
	testIt('should handle no tasks',
			[],
			'basic.no_tasks',
			taskListing);
	
	testIt('should handle only main tasks',
			['maintask1', 'maintask2'],
			'basic.main_only',
			taskListing);
	
	testIt('should handle only sub-tasks',
			['sub-task-1', 'sub-task-2'],
			'basic.sub_only',
			taskListing);
	
	testIt('should handle a mixture of tasks',
			['maintask1','maintask2','sub-task-1', 'sub-task-2'],
			'basic.both_types',
			taskListing);
	
	testIt('should handle various separators',
			['maintask1','maintask2','sub-task-1', 'sub:task:2', 'sub_task_3'],
			'basic.mixed_characters',
			taskListing);
});

describe('gulp-task-listing - custom configuration, regex', function() {
	testIt('should handle custom regexes',
			['main-task-1', 'main_task_2', 'sub:task-1', 'sub:task_2'],
			'custom.colon',
			taskListing.withFilters(/:/));
	
	testIt('should handle custom regexes 2',
			['main-task-1', 'main:task_2', 'sub~task-1', 'sub~task_3', 'sub~task:2'],
			'custom.tilde',
			taskListing.withFilters(/\~/));
	
	testIt('should handle exclusions',
			['maintask1', 'maintask2', 'badtask1', 'sub-task-1', 'sub-task-2', 'bad-task-2'],
			'basic.both_types',
			taskListing.withFilters(null, 'bad'));
	
	testIt('should handle custom regexes with exclusions',
			['main-task-1', 'main_task_2', 'bad-task-1', 'sub:task-1', 'sub:task_2', 'bad:task:two'],
			'custom.colon',
			taskListing.withFilters(/:/, 'bad'));
	
});

describe('gulp-task-listing - custom configuration, function', function() {
	testIt('should handle custom regexes',
			['main-task-1', 'main_task_2', 'sub:task-1', 'sub:task_2'],
			'custom.colon',
			taskListing.withFilters(function(task) {
				return task.indexOf(':') > -1;
			}));
	
	testIt('should handle exclusions',
			['maintask1', 'maintask2', 'badtask1', 'sub-task-1', 'sub-task-2', 'bad-task-2'],
			'basic.both_types',
			taskListing.withFilters(null, function(task) {
				return task.indexOf('bad') > -1;
			}));
	
});

function testIt(title, tasks, output, listing) {
	it(title, function() {
		gulp.tasks = tasks.reduce(function(tasks, t) {
			tasks[t] = 1; return tasks;
		}, {});
		var log = captureConsole(function() {
				listing();
			});
		log.should.equal(fs.readFileSync('./test/expected/' + output + '.txt').toString())
	});
}

function captureConsole(fn) {
	var _log = console.log,
		output = [];
	
	console.log = function() {
		try {
			output.push(
				[].slice.call(arguments)
					.join(' ')
					// remove command line coloring (we can ignore that safely)
					.replace(/\u001b\[\d*m/g, '')
			);
		} catch(err) {
			console.log = _log;
			throw err;
		}
	};
	
	fn();
	
	console.log = _log;
	
	return output.join('\n');
}
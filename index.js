/*jshint node:true */

"use strict";

var colors = require('chalk');
var gulp = require('gulp');


var DEFAULT_SUBTASK_REGEX = /[-_:]/,

	/**
	 *  This allows top level tasks to contain [-_:] in their names,
	 *  with subtask status being relative to other tasks in the list
	 *  rather than strictly based on on the seperator symbol
	 */
	subtaskLookupFilter = function(input_task) {
		var tasks = Object.keys(gulp.tasks).sort();
		var isSubtask = false;

		// Loop over the whole list of tasks, excluding self
		// Check if any other tasks match as a prefix for input_task + [-_:]
		for( var i= 0, n=tasks.length; i<n; i++ ) {
			if( input_task !== tasks[i]
				&& String(input_task).indexOf(tasks[i]) === 0
				&& String(input_task[tasks[i].length]).match(DEFAULT_SUBTASK_REGEX)
			) {
				var isSubtask = true;
				break;
			}
		}
		return isSubtask;
	},

	filter = function(inc, subtaskFilter) {
		return function(n) {
			var isSubtask = subtaskFilter(n);
			return (inc && isSubtask) || (!inc && !isSubtask);
		}
	},
	header = function(text) {
		console.log('');
		console.log(colors.gray(text));
		console.log('------------------------------');
	},
	regexFunc = function(rfn) {
		if(rfn && typeof rfn !== "function") {
			return function(t) {
				return t.search(rfn) !== -1;
			};
		}
		return rfn;
	},

	maxTaskNameLength  = 0,
	renderDependencies = function(name, showDependencies) {
		if( showDependencies == false ) { return ''; }

		// maxTaskNameLength calculation needs to wait until runtime for all tasks to have been defined
		maxTaskNameLength = maxTaskNameLength || Math.max.apply(Math, Object.keys(gulp.tasks).map(function(taskName) { return String(taskName).length;} )) + 10;

		var whitespace  = Array(Math.max(5, maxTaskNameLength - name.length)).join(' ');
		var fn          = String(gulp.tasks[name].fn).replace(/\s+/g,'') === 'function(){}' ? '' : 'function()';
		var deps        = [].concat(gulp.tasks[name].dep);
		if( deps.length && fn ) { deps = deps.concat(fn); }

		return whitespace + (( deps.length ) ? '[ '+deps.join(', ')+' ]' : '[]');
	},

	help = function(options) {
		options = options || {};
		var showDependencies = options.showDependencies;
		var subtaskFilter    = regexFunc(options.subtaskFilter || subtaskLookupFilter || DEFAULT_SUBTASK_REGEX);
		var excludeFilter    = regexFunc(options.excludeFilter);

		return function(cb) {
			var tasks = Object.keys(gulp.tasks).sort();
			if(excludeFilter) {
				tasks = tasks.filter(function(task) {
					return !excludeFilter(task);
				});
			}

			header('Main Tasks');

			tasks.filter(filter(false, subtaskFilter)).forEach(function(name) {
				console.log('    ' + colors.cyan(name) + renderDependencies(name, showDependencies) );
			});

			var subtasks = tasks.filter(filter(true, subtaskFilter));

			if(subtasks.length) {
				header('Sub Tasks');

				subtasks.forEach(function(name) {
					console.log('    ' + name + renderDependencies(name, showDependencies) );
				});
			}

			console.log('');

			// we're synchronous
			cb && cb();
		};
	};

module.exports = help();

module.exports.configure = function(options) {
	options = options || {
		subtaskFilter:    null,
		excludeFilter:    null,
		showDependencies: false
	};
	return help(options);
};

module.exports.withFilters = function(subtaskFilter, excludeFilter) {
	return help({
		subtaskFilter:    subtaskFilter,
		excludeFilter:    excludeFilter,
		showDependencies: false
	});
};

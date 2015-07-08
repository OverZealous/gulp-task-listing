# gulp-task-listing

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Support via Gratipay][gratipay-image]][gratipay-url]

Provides an easy way to get a listing of your tasks from your gulpfile.  By default, the output groups tasks based on whether or not they contain a hyphen (`-`), underscore (`_`), or colon (`:`) in their name.

You can optionally override the Regexp used to determine whether a task is a primary or subtask, as well as filter out tasks you don't want to see in the output.

## Usage

Install using:

    npm i --save-dev gulp-task-listing

Then add it to your gulpfile like so:

```js
var gulp = require('gulp');
var taskListing = require('gulp-task-listing');

// Add a task to render the output
gulp.task('help', taskListing);

// Add some top-level and sub tasks
gulp.task('build', ['build-js', 'build-css']);
gulp.task('build-js', function() { ... })
gulp.task('build-css', function() { ... })

gulp.task('compile', ['compile-js', 'compile-css']);
gulp.task('compile-js', function() { ... })
gulp.task('compile-css', function() { ... })
```

Now run `gulp help`, and you'll see this:

```plain
Main Tasks
------------------------------
    build
    compile
    help

Sub Tasks
------------------------------
    build-css
    build-js
    compile-css
    compile-js
```

## Customization

You can customize the output of the task listing by using the `taskListing.withFilters(subtaskFilter, excludeFilter)` method.  Both arguments are optional.  You can pass in a string, RegExp, or a custom function.

Alteratively you can pass in key/value options via:
```js
taskListing.configure({
    subtaskFilter: new RegExp() || String() || function(taskName){},
    excludeFilter: new RegExp() || String() || function(taskName){},
    showDependencies: true
})
```

### subtaskFilter

Providing this allows you to choose which tasks are `Main Tasks` (by returning `false`), and which are `Sub Tasks` (by returning `true`).

By default, this is defined as the regular expression `/[-_:]/`, which means that any task with a hyphen, underscore, or colon in it's name is assumed to be a subtask.

If, for example, you wanted to *only* use colons to determine a task's status, you could set it up like so:

```js
gulp.task('help', taskListing.withFilters(/:/));
```

If you had something more complex, you can use a function, like so:

```js
gulp.task('help', taskListing.withFilters(function(task) {
	isSubTask = // test task name for sub task properties
	return isSubTask;
}));
```

### excludeFilter

The exclude filter allows you to remove tasks from the listing.  If you want to remove tasks that contain the word `secret`, you could set it up like so:

```js
gulp.task('help', taskListing.withFilters(null, 'secret'));
```

If you had something more complex, you can use a function, like so:

```js
gulp.task('help', taskListing.withFilters(null, function(task) {
	exclude = // test task name for exclusion
	return exclude;
}));
```

> Note: setting the first argument to `null` allows you to retain the default behavior for subtask detection.

### showDependencies

The showDependencies option additionally renders out the task dependencies for each task,
which can be useful if you have a large set of nested tasks

```js
gulp.task('help', taskListing.configure({ showDependencies: true })
```

### primaryTasks

The primaryTasks array option allows you to manually specify a list of top level tasks 
to be rendered separately from the rest of the task list

```js
gulp.task('help', taskListing.configure({ primaryTasks: ['clean', 'development', 'staging', 'production', 'watch'] })
```



## Help Support This Project

If you'd like to support this and other OverZealous Creations (Phil DeJarnett) projects, [donate via Gratipay][gratipay-url]!

[![Support via Gratipay][gratipay-image]][gratipay-url]

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-task-listing
[npm-image]: https://badge.fury.io/js/gulp-task-listing.png

[travis-url]: http://travis-ci.org/OverZealous/gulp-task-listing
[travis-image]: https://secure.travis-ci.org/OverZealous/gulp-task-listing.png?branch=master

[gratipay-url]: https://www.gratipay.com/OverZealous/
[gratipay-image]: https://img.shields.io/gratipay/OverZealous.svg

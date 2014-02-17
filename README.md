# gulp-task-listing

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Provides an easy way to get a listing of your tasks from your gulpfile.  The output groups tasks based on whether or not they contain a hyphen (`-`) or underscore (`_`) in their name.

## Usage

Install using:

    npm i --save-dev gulp-task-listing

Then add it to your gulpfile like so:

```js
var gulp = require('gulp');
var help = require('gulp-task-listing');

// Add a task to render the output
gulp.task('help', help);

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

## Help Support This Project

If you'd like to support this and other OverZealous Creations (Phil DeJarnett) projects, [donate via Gittip][gittip-url]!

[![Support via Gittip][gittip-image]][gittip-url]

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-task-listing
[npm-image]: https://badge.fury.io/js/gulp-task-listing.png

[travis-url]: http://travis-ci.org/OverZealous/gulp-task-listing
[travis-image]: https://secure.travis-ci.org/OverZealous/gulp-task-listing.png?branch=master

[gittip-url]: https://www.gittip.com/OverZealous/
[gittip-image]: https://raw2.github.com/OverZealous/gittip-badge/0.1.2/dist/gittip.png

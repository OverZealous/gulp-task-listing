![status](https://secure.travis-ci.org/OverZealous/gulp-task-listing.png?branch=master)

gulp-task-listing
=======

Provides an easy way to get a listing of your tasks from your gulpfile.  The output groups tasks based on whether or not they contain a hyphen (`-`) or underscore (`_`) in their name.

Usage
-----

Note: You must call the exported function with your gulp instance.

```js
var gulp = require('gulp');
var help = require('gulp-task-listing')(gulp);

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


LICENSE
-------

(MIT License)

Copyright (c) 2014 [Phil DeJarnett](http://overzealous.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

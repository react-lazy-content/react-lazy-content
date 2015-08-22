var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var babelify = require('babelify');

var opts = {
  mainJsInput: 'index.js',
  mainJsOutput: 'bundle.js',
  buildFolder: './',
  watchedFiles: [
    './index.js',
    './node_modules/react-lazy-content/**/*.js'
  ]
};

gulp.task('build', function() {
  var b = browserify();
  b.transform(babelify);
  b.add(opts.mainJsInput);
  return b.bundle()
    .pipe(source(opts.mainJsInput))
    .pipe(rename(opts.mainJsOutput))
    .pipe(gulp.dest(opts.buildFolder));
});

gulp.task('default', ['build'], function() {
  gulp.watch(opts.watchedFiles, ['build']);
});

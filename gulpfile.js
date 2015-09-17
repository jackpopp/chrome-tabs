var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify'); 
var source = require('vinyl-source-stream');

var paths = {
  app_js: ['./src/app.jsx'],
  js: ['src/*.*'],
};

gulp.task('js', [], function() {
  // Browserify/bundle the JS.
  browserify(paths.app_js)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});
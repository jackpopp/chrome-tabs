var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify'); 
var source = require('vinyl-source-stream');
var del = require('del');
var zip = require('gulp-zip');
var jsonfile = require('jsonfile');
var prompt = require('gulp-prompt');

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

gulp.task('bump_version', function(done) {
	var json = require('./manifest.json');

	gulp.src('*').pipe(
		prompt.prompt({
	        type: 'input',
	        name: 'version',
	        message: 'Current version is '+json.version+' please enter a new version:'
	    }, function(res) {
	    	json.version = res.version;
	    	jsonfile.writeFile('manifest.json', json, {spaces: 2}, function (err) {
				done();
			});
	    })
    );
});

gulp.task('publish',['bump_version'], function() {

	del(['./dist/*']).then(function () {
	    
		return gulp.src([
			'./manifest.json',
			'./bundle.js',
			'./bootstrap.min.css',
			'icon_128.png',
			'icon_16.png',
			'index.html',
			'init.js',
			'popup.html',
			'sweetalert.css'
		])
		//.pipe(gulp.dest('./dist'))
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./dist'));

	});
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});
var gulp = require('gulp'),
	connect = require('gulp-connect');
	babel = require('gulp-babel');

var paths = [
	{ "/assets": "assets/*" },
	{ "/css": "css/*" },
	{ "/": "index.html" }
];

gulp.task('copy', function(){
	paths.forEach(function(src){
		var key = Object.keys(src)[0];
		gulp.src("src/" + src[key])
	    .pipe(gulp.dest("dist" + key));
	});
});
 
gulp.task('webserver', function() {
	connect.server();
});

gulp.task('babel', function () {
  return gulp.src("src/js/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/js"));
});

gulp.task('default', ['webserver', 'babel', 'copy']);
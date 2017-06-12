var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var inline = require('gulp-inline');

gulp.task('default', function(){
  return gulp.src('index.html')
    .pipe(inline({
      base: '/',
      js: uglify,
      css: cleanCSS
    }))
    .pipe(gulp.dest('dist/'));
});
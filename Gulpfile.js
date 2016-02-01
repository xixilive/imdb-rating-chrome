var gulp = require('gulp'),
    del = require('del'),
    uglify = require('gulp-uglify');

gulp.task('clean', del.bind(null, ['./build/*'], {dot: true}));

gulp.task('copy:images', function() {
  return gulp.src('./images/*.png')
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('copy:manifest', function() {
  return gulp.src('./src/manifest.json')
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', function() {
  return gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['clean'], function(){
  gulp.start('copy:images', 'copy:manifest', 'build');
});

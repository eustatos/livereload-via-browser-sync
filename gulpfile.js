var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var browserSync = require('browser-sync');

gulp.task('less', function () {
    return gulp.src('./src/less/main.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './dist'
    },
  })
});

gulp.task('html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync', 'less', 'html'], function() {
    
    gulp.watch('./src/less/**/*.less', function() {
        gulp.run('less');
    });
    gulp.watch('./src/**/*.html', function() {
        gulp.run('html');
    });
});

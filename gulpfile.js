var lr = require('tiny-lr');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('connect');
var server = lr();
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('less', function () {
    return gulp.scr('./src/less/main.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./dist/css'));
})


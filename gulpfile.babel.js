import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import less from 'gulp-less';
import LessAutoprefix from 'less-plugin-autoprefix';
import browserSync from 'browser-sync';

const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const scriptsSources = [
  './bower_components/jquery/dist/jquery.min.js',
  './bower_components/bootstrap/dist/js/bootstrap.min.js',
  './src/**/*.js',
];

gulp.task('less', () => {
  gulp.src('./src/less/main.less')
    .pipe(less({
      plugins: [autoprefix],
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './dist',
    },
  });
});

gulp.task('html', () => {
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('scripts', () => {
  gulp.src(scriptsSources)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});
gulp.task('icons', () => {
  gulp.src('./bower_components/font-awesome/fonts/**/*.*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', () => {
  gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
        .pipe(browserSync.reload({
          stream: true,
        }));
});

gulp.task('watch', ['browserSync', 'less', 'html', 'icons', 'scripts'], () => {
  gulp.watch('./src/less/**/*.less', () => {
    gulp.run('less');
  });
  gulp.watch('./src/js/**/*.js', () => {
    gulp.run('scripts');
  });
  gulp.watch('./src/img/**/*.*', () => {
    gulp.run('images');
  });
  gulp.watch('./src/**/*.html', () => {
    gulp.run('html');
  });
});

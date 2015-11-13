var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    csso = require('gulp-csso');

gulp.task('connect', function() {
    connect.server({
        root: 'layout',
        livereload: true
    });
});

//css
gulp.task('css', function() {
    gulp.src('./layout/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions', 'Opera 12.1', 'ie 9', 'ie 8'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./layout/css'))
        .pipe(connect.reload());
});

gulp.task('html', function(){
    gulp.src('./layout/*.html')
        .pipe(connect.reload());
});

//watch
gulp.task('watch', function() {
    gulp.watch('./layout/css/style.css', ['css']);
    gulp.watch('./layout/*.html', ['html']);
});

//default
gulp.task('default', ['connect', 'watch', 'html', 'css']);
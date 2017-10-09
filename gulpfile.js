// including plugins
var gulp = require('gulp')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var less = require('gulp-less')
var to5 = require('gulp-6to5')
var path = require('path')

gulp.task('less', function () {
  return gulp.src('./assets/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('css', ['less'], function(){
    return gulp.src(
            [
                './assets/css/bootstrap.css',
                './assets/css/style.css',
                './assets/css/swiper.css',
                './assets/css/dark.css',
                './assets/css/font-icons.css',
                './assets/css/animate.css',
                './assets/css/magnific-popup.css',
                './assets/css/responsive.css',
                './assets/css/custom.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('copy-fonts', function(){
    return gulp.src(
            ['./assets/css/fonts/**']
        )
        .pipe(gulp.dest('./dist/css/fonts/'))
})

gulp.task('style', ['css', 'copy-fonts'], function(){})


gulp.task('js', function(){
    return gulp.src(
            [
                './assets/js/jquery.js',
                './assets/js/plugins.js',
                './assets/js/functions.js',
                './assets/js/custom.js'
            ]
        )
        .pipe(gp_concat('vendor.min.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./dist/js/'))
});

gulp.task('es6-es5', ['js'], function(){
    return gulp.src([
                './src/*/**.js',
                './src/*/*/**.js'
            ]
        )
        .pipe(to5())
        .pipe(gulp.dest('./dist/es5/'))
});

gulp.task('watch', function() {
    gulp.watch(['./src/*/**.js', './src/*/*/**.js', './assets/js/**.js'], ['es6-es5'])
})

gulp.task('prod', ['style', 'es6-es5'], function(){})

gulp.task('default', ['es6-es5', 'watch'], function(){})

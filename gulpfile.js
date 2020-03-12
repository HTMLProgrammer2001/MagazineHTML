const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


sass.compiler = require('node-sass');

gulp.task('css', function(){
   return gulp.src('./src/css/*.css')
       .pipe(concat('bundle.css'))
       .pipe(autoprefixer())
       .pipe(cleanCSS({compatibility: 'ie8'}))
       .pipe(gulp.dest('./dist/css'))
       .pipe(reload({stream: true}));
});

gulp.task('scss', function () {
   return gulp.src('./src/scss/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(concat('bundle.css'))
       .pipe(cleanCSS({compatibility: 'ie8'}))
       .pipe(gulp.dest('./dist/css'))
       .pipe(reload({stream: true}));
});

gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
   return gulp.src('./src/js/main.js')
       .pipe(babel({presets: ['@babel/preset-env']}))
       .pipe(uglify())
       .pipe(browserify({
            insertGlobals : true,
            debug : false
        }))
       .pipe(concat('bundle.js'))
       .pipe(gulp.dest('./dist/js'))
       .pipe(reload({stream: true}));
});

gulp.task('image', function () {
    return gulp.src('./src/image/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/image/'))
        .pipe(reload({stream: true}));
});

gulp.task('html', function(){
   return gulp.src('./src/pages/*.html')
       .pipe(gulp.dest('./dist/'))
       .pipe(reload({stream: true}));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('build', async function () {
    gulp.parallel(
        'html',
        'css',
        'scss',
        'less',
        'js',
        'image'
    );
});

gulp.task('watch', function () {
    gulp.watch('./src/pages/*.html', gulp.series('html')).on('change', reload);
    gulp.watch('./src/scss/*.scss', gulp.series('scss'));
    gulp.watch('./src/css/*.css', gulp.series('css'));
    gulp.watch('./src/js/*.js', gulp.series('js'));
});
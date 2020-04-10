const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pugCompiler = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const through = require('through2');
const del = require('del');
const rename = require('gulp-rename');
const sourceMap = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');

const browserSync = require('browser-sync').create();

const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');

sass.compiler = require('node-sass');

function scss(){
	return gulp.src('./src/scss/pages/*/*.scss', {
		allowEmpty: true
	})
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(rename((path) => ({
			basename: path.basename,
			dirname: './',
			extname: '.css'
		})))
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(browserSync.stream());
}

function js(mode){
	return function javascript(){
		return gulp.src('./src/js/main.js', {
			allowEmpty: true
		})
			.pipe(eslint())
			.pipe(eslint.formatEach('compact', process.stderr))
			.pipe(eslint.failAfterError())
			.pipe(mode === 'production' ?
				sourceMap.init() :
				through.obj((chunk, enc, cb) =>
					cb(null, chunk)))
			.pipe(webpackStream({
				...webpackConfig,
				mode
			}), webpack)
			.pipe(concat('bundle.js'))
			.pipe(mode === 'production' ?
				uglify() :
				through.obj((chunk, enc, cb) =>
					cb(null, chunk))
			)
			.pipe(mode === 'production' ?
				sourceMap.write() :
				through.obj((chunk, enc, cb) =>
					cb(null, chunk)))
			.pipe(gulp.dest('./dist/js'))
			.pipe(browserSync.stream());
	};
}

function image() {
	return gulp.src('./src/image/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/image/'))
		.pipe(browserSync.stream());
}

function pug() {
	return gulp.src('./src/pug/pages/*/*.pug', {
		allowEmpty: true
	})
		.pipe(pugCompiler())
		.pipe(rename((path) => ({
			basename: path.basename,
			dirname: './',
			extname: '.html'
		})))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream());
}

function clean(){
	return del('./dist');
}

function watch(){
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	});

	gulp.watch('./src/pug/**/*.pug', pug).on('change', browserSync.reload);
	gulp.watch('./src/scss/**/*.scss', scss);
	gulp.watch('./src/image/**/*.*', image);
	gulp.watch('./src/js/**/*.js', js('development'));
}

function build(){
	return gulp.series(clean, gulp.parallel(
		pug, scss, js('production'), image
	));
}

gulp.task('scss', scss);
gulp.task('html', pug);
gulp.task('js', js('production'));
gulp.task('image', image);
gulp.task('watch', watch);
gulp.task('build', build());
gulp.task('default', build());

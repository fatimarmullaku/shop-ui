const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const nunjucks = require('gulp-nunjucks');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const browserSync = require('browser-sync');
const merge = require('merge-stream');
const uglifyJs = require('gulp-uglify');
const concat = require('gulp-concat');
const order = require('gulp-order');
// region config variables
let config = require('./config.json');
// endregion

// region clean task
function clean(cb) {
	del.sync([
		config.build.dist,
		"src/sass/global/_icons.scss"
	]);
	cb();
}

gulp.task('clean', gulp.series(clean));
// endregion

/**
 * Sass task is used for compiling sass/scss to css format
 */
gulp.task('sass', function () {
	return gulp.src(config.build.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		// todo: run only for production
		// .pipe(autoprefixer())
		.pipe(sourcemaps.write('.', {sourceRoot: '/'}))
		.pipe(gulp.dest(config.build.dist + config.build.sass.dist))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/**
 * Compile task is used for compiling nunjucks templates to HTML format
 * and move to compiled files to dist directory
 */
gulp.task('compile', function () {
	config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

	return gulp.src(config.build.nunjucks.src)
		.pipe(nunjucks.compile(config.app))
		.pipe(gulp.dest(config.build.dist))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/**
 * TODO: fix image optimization
 */
gulp.task('images', function () {
	return gulp.src(config.build.images.src)
		.pipe(gulp.dest(config.build.dist + config.build.images.dist));
});

/**
 * Copy vendors to dist directory
 */
// gulp.task('vendors:copy', function () {
// 	return gulp.src(config.build.vendors.src)
// 		.pipe(gulp.dest(config.build.dist + config.build.vendors.dist));
// });

/**
 * Convert svg icons to font
 */
gulp.task('iconfont', function () {
	return gulp.src(config.build.icons.src)
		.pipe(iconfontCss({
			fontName: config.build.icons.fontName,
			targetPath: config.build.icons.sass,
			fontPath: '../fonts/' + config.build.icons.fontName + '/',
			cssClass: config.build.icons.fontName
		}))
		.pipe(iconfont({
			prependUnicode: false,
			fontName: config.build.icons.fontName,
			formats: ['ttf', 'eot', 'woff', 'woff2'],
			normalize: true,
			fontHeight: 1001
		}))
		.pipe(gulp.dest(config.build.dist + '/' + config.build.icons.dist + config.build.icons.fontName));
});

gulp.task('scripts', function () {
	return merge(gulp.src(config.build.scripts.src), gulp.src(config.build.vendors.js))
		.pipe(order([
			config.build.vendors.js
		], { base: '.'}))
		.pipe(concat('all.min.js'))
		.pipe(uglifyJs())
		.pipe(gulp.dest(config.build.dist + config.build.scripts.dist));
});

/**
 * Done function is used as async finish call for gulp
 * @param done
 */
function done(done) {
	done();
}

/**
 * WS is local server with sync socket
 */
gulp.task('ws', function (cb) {
	browserSync({
		server: {
			baseDir: config.build.dist
		},
		port: 4000,
		notify: false,
		open: true
	}, cb);
});

/**
 * Watch task checks for file changes on sass and template and run compilers
 */
gulp.task('watch', function () {
	gulp.watch(config.build.scripts.src, gulp.series('scripts', done));
	gulp.watch(config.build.sass.watch, gulp.series('sass', done));
	gulp.watch([
		config.build.nunjucks.watch,
		"config.json"
	], gulp.series('compile', done));
});

/**
 * Init local server and watch task
 */
gulp.task('default', gulp.series('ws', 'watch'));


const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");
const runSequence = require("run-sequence");
const eslint = require("gulp-eslint");
const webpack = require("gulp-webpack");
const webpackConfig = require("../../../webpack.config");
const gulpif = require("gulp-if");
const globalVars = require("./_global-vars");
const minify = require('gulp-minify');

const destinationFolder = "dist/js";

/*----------------------------------------------------------------------------------------------
	JS
 ----------------------------------------------------------------------------------------------*/
// task: build javascript
gulp.task("js-task", function() {
	return gulp
		.src("src/js/**.js")
		.pipe(plumber())
		.pipe(webpack(webpackConfig))
		.pipe(gulpif(globalVars.productionBuild, uglify()))
		.pipe(rename({ basename: "theme" , suffix: ".min"}))
		.pipe(gulp.dest(destinationFolder));
});

// task: validate javascript source files
gulp.task("js-lint", function() {
	return gulp
		.src("src/js/_project/**/*.js")
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('js-copy', function(){
    return gulp.src(['src/js/*.js', '!src/js/theme.js'])
	.pipe(gulp.dest(destinationFolder));
});

gulp.task("js", function() {
	runSequence("js-lint", "js-copy", "js-task", () => false);
});

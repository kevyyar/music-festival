const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
// Images
const webp = require("gulp-webp")

function css(done) {
  src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"));
  done();
}

function optimizeImgs(done) {
  const options = {
    quality: 50,
  }
  src("src/img/**/*.{jpg,png}")
    .pipe(webp(options))
    .pipe(dest("build/img"));
  done()
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  done();
}

exports.css = css;
exports.optimizeImgs = optimizeImgs;
exports.dev = parallel(optimizeImgs, dev);

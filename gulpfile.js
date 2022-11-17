const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
// Images
const webp = require("gulp-webp");
const imgMin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif");

function css(done) {
  src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"));
  done();
}

function minimizeImgs(done) {
  const options = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{jpg,png}")
    .pipe(cache(imgMin(options)))
    .pipe(dest("build/img"));
  done();
}

function webpImgs(done) {
  const options = {
    quality: 50,
  };
  src("src/img/**/*.{jpg,png}").pipe(webp(options)).pipe(dest("build/img"));
  done();
}

function avifImgs(done) {
  const options = {
    quality: 50,
  };
  src("src/img/**/*.{jpg,png}").pipe(avif(options)).pipe(dest("build/img"));
  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  done();
}

exports.css = css;
exports.minimizeImgs = minimizeImgs;
exports.webpImgs = webpImgs;
exports.avifImgs = avifImgs;
exports.dev = parallel(minimizeImgs, webpImgs, avifImgs, dev);


// css y sass
// import imagemin from 'imagemin';

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
// imagenes
// const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    // compilar sass paso 1: identificar el archivo paso 2: compilar paso 3: guardar el css
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    done();
}

function imagenes(done) {
    src('src/img/**/*')
        // .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
    done();
}

function versionWebp(done) {
    src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'));
    done();
}
function versionAvif(done) {
    src('src/img/**/*.{png,jpg}')
        .pipe(avif())
        .pipe(dest('build/img'));
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    // watch('src/img/**/*', imagenes);
    // watch('src/img/**/*.{png,jpg}', versionWebp);
    // watch('src/img/**/*.{png,jpg}', versionAvif);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

exports.default = series(versionAvif, versionWebp, imagenes, css, dev);
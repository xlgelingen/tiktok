const { src, dest, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const less    = require('gulp-less');
const rename  = require('gulp-rename');
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');
const autoprefixer = require('autoprefixer');

function script() {
  return src('src/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('./dist/js'));
}

function style(){
  return src('src/less/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
    .pipe(csso())
    .pipe(
      rename(function(path) {
        path.extname = '.min.css';
      })
    )
    .pipe(dest('./dist/css'));
}

function watchAll() {
  return watch('src/**', parallel(script, style))
}

exports.script = script;
exports.style = style;
exports.default = watchAll;
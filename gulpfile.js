'use strict';

var options = {};

var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    sassInlineSvg = require('gulp-sass-inline-svg'),
    svgmin = require('gulp-svgmin'),
    imagemin = require('gulp-imagemin'),
    kss = require('kss'),
    del = require('del'),
    makedir = require('make-dir');

options.styleGuide = {
    title: 'Naturelle StyleGuide',
    mask: '*.scss',
    placeholder: "[modifier]",
    builder: 'node_modules/michelangelo/kss_styleguide/custom-template/',
    source: 'src/',
    destination: 'dist/styleguide/',
    homepage: 'homepage.md',
    css: [
        'dist/main.css'
    ],
    js: [
        'dist/main.js'
    ]
};

gulp.task('sass:svg', function(){
    return gulp.src('src/assets/svgs/**/*.svg')
      .pipe(svgmin())
      .pipe(sassInlineSvg({
        destDir: 'src/base'
      }));
});

gulp.task('images', () =>
    gulp.src('src/assets/imgs/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/imgs'))
);

gulp.task('styles', function(){
    return gulp.src('src/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(prefix('last 2 versions'))
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'))
});

gulp.task('styleguide', function(cb) {
    kss(options.styleGuide, cb);
});


gulp.task('serve', ['sass:svg', 'images', 'styles', 'styleguide']);

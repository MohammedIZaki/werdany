const gulp = require('gulp');
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const html = require('gulp-htmlmin');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
// const notify = require('gulp-notify');
const zip = require('gulp-zip');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
// html task
gulp.task('html', function(){
  require('./server');
  return gulp.src('project/*.html')
    // .pipe(pug({pretty: true}))      //option ({pretty: true})   dont minfy it
    .pipe(html({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'))
    // .pipe(notify('html task done'))
    .pipe(livereload({start: true}))
});

// css task
gulp.task('css', function(){
  return gulp.src('project/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix('last 2 versions'))
  .pipe(sourcemaps.write('.'))
  // .pipe(concat('testSass.css'))
  .pipe(gulp.dest('dist/css'))
  // .pipe(notify('css task done'))
  .pipe(livereload({start: true}))
});
// imagemin
gulp.task('imagemin', function() {
  return gulp.src('project/img/*')
    .pipe(imagemin(
      imagemin.jpegtran({progressive: true})
      // tere is more option for different tybs of images
    ))
    .pipe(gulp.dest('dist/img'))
    // .pipe(notify('images compressed'))
    .pipe(livereload({start: true}))
})
// js task
gulp.task('js', function(){
  return gulp.src('project/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js')) 
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    // .pipe(notify('js task done'))
    .pipe(livereload({start: true}))
});


// compress files
gulp.task('compress', function() {
  return gulp.src('dist/**/*.*')
    .pipe(zip('production.zip'))
    .pipe(gulp.dest('.'))
    // .pipe(notify('project compressed')) 
})

// watch tasks when save
gulp.task('watch', function() {
  require('./server.js');
  livereload.listen();
  gulp.watch('project/*.html', ['html']),
  gulp.watch('project/main.scss', ['css']),
  gulp.watch('project/js/*.js', ['js']),
  gulp.watch('dist/**/*.*', ['compress']),
  gulp.watch('project/img/*', ['imagemin'])
});



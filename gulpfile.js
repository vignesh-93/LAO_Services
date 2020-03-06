// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');

gulp.task('log', function() {
    gutil.log('== My Log Task ==')
  });



  
gulp.task('nodemon', function() {
  nodemon({
    script: './configuration/cluster.js',
    ext: 'js',
    ignore: ['dist/']
  })
  .on('restart', function() {
    console.log('>> node restart');
  })
});

//
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// // // Compile Our Sass
// // gulp.task('sass', function() {
// //     return gulp.src('scss/*.scss')
// //         .pipe(sass())
// //         .pipe(gulp.dest('dist/css'));
// // });

// // Concatenate & Minify JS
// // BBoxView: take control on the way you debug.  Enable once you stabilize build.
gulp.task('scripts',function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
   // gulp.watch('scss/*.scss', ['sass']);
});

// // Default Task
// gulp.task('default', ['lint',  'scripts', 'watch']);
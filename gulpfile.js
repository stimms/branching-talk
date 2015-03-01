var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');


gulp.task("build-es6", function(){
  return gulp.src("*.es6")
        .pipe(plumber({
          handleError: function(err){
            console.log(err);
            this.emit("end");
          }
        }))
        .pipe(babel())
        .pipe(concat("charts.js"))
        .pipe(gulp.dest("."));
});

gulp.task("watch", ["build-es6"], function(){
  watch("*.es6", function(){
    gulp.start('build-es6');
  })

});

gulp.task("default", ["watch"],function(){});

var gulp = require('gulp');
var tarragon = require('./tarragon-gulp.js');

gulp.task('default', function() {
    return gulp.src('test.html')
        .pipe(tarragon())
        .pipe(gulp.dest('destination/path'));
});

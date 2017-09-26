const gulp = require('gulp');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

// move all html to dist/ minified
gulp.task('copyHtml', () => {
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

// minify js and copy to dist/js/
gulp.task('minjs', () => {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// compile sass, minify sass css files and copy them to dist/
gulp.task('styles', () => {
    gulp.src('src/styles/*.scss')
        // if sass() returns an error, we must log it ourselves
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
    gulp.src('src/styles/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

// maintenance: run all tasks
gulp.task('main', ['copyHtml', 'minjs', 'styles']);

// showing instructions
gulp.task('default', () => {
    console.log('=================================');
    console.log('If the dist folder is missing from the project, run gulp main to set it up.');
    console.log('Other gulp tasks: copyHtml, minjs, styles.');
    console.log('See gulpfile for more info on each task.')
    console.log('=================================');
})

// watch for file changes
gulp.task('watch', () => {
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/sass/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['minjs']);
});
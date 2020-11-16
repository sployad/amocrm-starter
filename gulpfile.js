const path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    jsonlint = require('gulp-jsonlint'),
    csslint = require('gulp-csslint'),
    autoprefixer = require('gulp-autoprefixer'),
    zip = require('gulp-zip'),
    include = require('gulp-include'),
    strip = require('gulp-strip-comments'),
    del = require('del'),
    jeditor = require('gulp-json-editor'),
    pkg = require('./package'),
    semver = require('semver')

const paths = {
        src: path.resolve(__dirname, 'src'),
        dist: path.resolve(__dirname, 'dist'),
        publish: path.resolve(__dirname, 'publish'),
    },
    zipFileName = 'widget.zip';
let manifest = require(`${paths.src}/manifest.json`);

gulp.task('clean', function () {
    return del([path.dist + '/**', paths.publish + '/**'])
});

gulp.task('jslint', gulp.series('clean', function () {
    return gulp.src(paths.src + "/js/*.js")
        .pipe(jshint(pkg.jshintConfig))
        .pipe(jshint.reporter('jshint-stylish'))
}));

gulp.task('js', gulp.series('jslint', function () {
    return gulp.src(paths.src + "/js/script.js")
        .pipe(include())
        .on('error', console.log)
        .pipe(strip())
        .pipe(gulp.dest(paths.dist))
}));

gulp.task('i18n', gulp.series('js', function () {
    return gulp.src(paths.src + '/i18n/*.json')
        .pipe(jsonlint())
        .pipe(jsonlint.failOnError())
        .pipe(jsonlint.reporter())
        .pipe(gulp.dest(paths.dist + '/i18n/'))
}));

gulp.task('css', gulp.series('i18n', function () {
    return gulp.src(paths.src + '/css/style.css')
        .pipe(csslint())
        .pipe(csslint.formatter("compact"))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.dist))
}));

    gulp.task('img', gulp.series('css', function () {
    return gulp.src(paths.src + "/images/**")
        .pipe(gulp.dest(paths.dist + "/images/"))
}));

gulp.task('templates', gulp.series('img'), function () {
    return gulp.src(paths.src + "/templates/**")
        .pipe(gulp.dest(paths.dist + "/templates/"))
});

gulp.task('manifest', gulp.series('templates', function () {

    return gulp.src(paths.src + "/manifest.json")
        .pipe(jsonlint())
        .pipe(jsonlint.failOnError())
        .pipe(jsonlint.reporter())
        .pipe(jeditor(function () {
            manifest.widget.version = semver.inc(manifest.widget.version, 'patch');
            return manifest;
        }))
        .pipe(gulp.dest(paths.src))
        .pipe(gulp.dest(paths.dist))
}));


gulp.task('zip', gulp.series('manifest', function () {
    return gulp.src(paths.dist + '/**/*.*')
        .pipe(zip(zipFileName))
        .pipe(gulp.dest(paths.publish))
}));


gulp.task('build', gulp.series('zip', function (done) {
    gutil.log(gutil.colors.green('Successfull build: '), gutil.colors.cyan(paths.publish + '/' + zipFileName));
    done()
}));

gulp.task('default', gulp.series("build"));

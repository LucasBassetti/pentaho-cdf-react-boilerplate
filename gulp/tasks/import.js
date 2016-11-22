const gulp    = require('gulp'),
      config  = require('../config'),
      shell   = require('gulp-shell'),
      gulpZip = require('gulp-zip');

const biServerCommandPath = config.default.biServerCommandPath,
      petahoURL           = config.default.pentahoURL,
      pentahoUsername     = config.default.pentahoUsername,
      pentahoPassword     = config.default.pentahoPassword,

      pentahoImport  = `${biServerCommandPath} --import --url=${petahoURL} --username=${pentahoUsername} --password=${pentahoPassword} --overwrite=true --permission=true --retainOwnership=true`,
      projectPath      = config.default.projectPath,   // user source path
      pentahoPath      = config.default.pentahoPath,   // pentaho path
      zipfilePath      = config.default.zipfilePath,   // user file path

      // zip file paths
      zipPath = {
          bower    : zipfilePath + 'bower.zip',
          cdas     : zipfilePath + 'cdas.zip',
          html     : zipfilePath + 'html.zip',
          css      : zipfilePath + 'css.zip',
          js       : zipfilePath + 'js.zip',
      };

/* SOURCE TASKS
=================================== */

gulp.task('zip:bower', function() {
    return gulp.src('./app/bower_components/**', {
            base: './app'
        })
        .pipe(gulpZip('bower.zip'))
        .pipe(gulp.dest('./zip'));
});
gulp.task('import:bower', ['zip:bower'], shell.task([
    `${pentahoImport} --path=${pentahoPath}${projectPath} --file-path=${zipPath.bower}`
]));

gulp.task('zip:cdas', function() {
    return gulp.src('./app/cdas/**', {
            base: './app'
        })
        .pipe(gulpZip('cdas.zip'))
        .pipe(gulp.dest('./zip'));
});
gulp.task('import:cdas', ['zip:cdas'], shell.task([
    `${pentahoImport} --path=${pentahoPath}${projectPath} --file-path=${zipPath.cdas}`
]));

gulp.task('zip:js', function() {
    return gulp.src(`./${projectPath}/js/**`, {
            base: './'
        })
        .pipe(gulpZip('js.zip'))
        .pipe(gulp.dest('./zip'));
});
gulp.task('import-js', ['zip:js'], shell.task([
    `${pentahoImport} --path=${pentahoPath} --file-path=${zipPath.js}`
]));

gulp.task('zip:css', function() {
    return gulp.src(`./${projectPath}/css/**`, {
            base: './'
        })
        .pipe(gulpZip('css.zip'))
        .pipe(gulp.dest('./zip'));
});
gulp.task('import-css', ['zip:css'], shell.task([
    `${pentahoImport} --path=${pentahoPath} --file-path=${zipPath.css}`
]));

gulp.task('zip:html', function() {
    return gulp.src([`./${projectPath}/**`, `!./${projectPath}{/css,/css/**,/js,/js/**}`], {
            base: './'
        })
        .pipe(gulpZip('html.zip'))
        .pipe(gulp.dest('./zip'));
});
gulp.task('import-html', ['zip:html'], shell.task([
    `${pentahoImport} --path=${pentahoPath} --file-path=${zipPath.html}`
]));

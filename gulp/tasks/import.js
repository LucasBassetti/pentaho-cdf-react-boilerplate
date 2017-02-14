const gulp    = require('gulp'),
      config  = require('../config'),
      shell   = require('gulp-shell'),
      gulpZip = require('gulp-zip');

const biServerCommandPath = config.default.biServerCommandPath,
      petahoURL           = config.default.pentahoURL,
      pentahoUsername     = config.default.pentahoUsername,
      pentahoPassword     = config.default.pentahoPassword,

      pentahoImport  = `${biServerCommandPath} --import --url=${petahoURL} --username=${pentahoUsername} --password=${pentahoPassword} --overwrite=true --permission=true --retainOwnership=true`,
      projectPath      = config.default.projectPath,    // user source path
      pentahoPath      = config.default.pentahoPath,    // pentaho path
      pentahoSubPath   = config.default.pentahoSubPath, // pentaho sub path
      zipfilePath      = config.default.zipfilePath,    // user file path

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

gulp.task('import:cdas', function() {
    gulp.start('import-cdas');
});

gulp.task('zip:cdas', function() {
    return gulp.src('./app/cdas/**', {
            base: './app'
        })
        .pipe(gulpZip('cdas.zip'))
        .pipe(gulp.dest('./zip'));
});
gulp.task('import-cdas', ['zip:cdas'], shell.task([
    `${pentahoImport} --path=${pentahoPath}${projectPath} --file-path=${zipPath.cdas}`
]));

gulp.task('zip:js', function() {
    return gulp.src(`./${projectPath}${pentahoSubPath}/js/**`, {
            base: './'
        })
        .pipe(gulpZip('js.zip'))
        .pipe(gulp.dest('./zip'));
});
gulp.task('import-js', ['zip:js'], shell.task([
    `${pentahoImport} --path=${pentahoPath} --file-path=${zipPath.js}`
]));

gulp.task('zip:css', function() {
    return gulp.src(`./${projectPath}${pentahoSubPath}/css/**`, {
            base: './'
        })
        .pipe(gulpZip('css.zip'))
        .pipe(gulp.dest('./zip'));
});
gulp.task('import-css', ['zip:css'], shell.task([
    `${pentahoImport} --path=${pentahoPath} --file-path=${zipPath.css}`
]));

gulp.task('zip:html', function() {
    return gulp.src([`./${projectPath}/**`, `!./${projectPath}{${pentahoSubPath},${pentahoSubPath}**}`], {
            base: './'
        })
        .pipe(gulpZip('html.zip'))
        .pipe(gulp.dest('./zip'));
});
gulp.task('import-html', ['zip:html'], shell.task([
    `${pentahoImport} --path=${pentahoPath} --file-path=${zipPath.html}`
]));

// BUILD

gulp.task('zip:project', function() {
    return gulp.src(`./${projectPath}/**`, {
            base: './'
        })
        .pipe(gulpZip(`${projectPath}.zip`))
        .pipe(gulp.dest('./'));
});

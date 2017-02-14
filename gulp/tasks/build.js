'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', ['build-all'], function() {
    gulp.start('zip:project');
});

gulp.task('build-all', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = true;
  global.isBuild = true;

  return runSequence([
      'copyCDAs',
      'sass',
      'imagemin',
      'browserify',
      'copyFonts',
      'copyIndex',
      'copyIcons'
  ], cb);

  // return runSequence([
  //     'zip:cdas',
  //     'build:css',
  //     'imagemin',
  //     'build:js',
  //     'copyFonts',
  //     'build:html',
  //     'copyIcons'
  // ], cb);

});

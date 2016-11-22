'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  return runSequence(['import:cdas', 'import:css', 'imagemin', 'import:js', 'copyFonts', 'import:html', 'copyIcons'], 'watch', cb);

});

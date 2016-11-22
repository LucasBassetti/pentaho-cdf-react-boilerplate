'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('prod', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = true;

  return runSequence(['import:css', 'imagemin', 'import:js', 'copyFonts', 'import:html', 'copyIcons'], 'watch', cb);

});

'use strict';

import gulp   from 'gulp';
import config from '../config';

gulp.task('watch', function() {

  // Scripts are automatically watched by these watchs
  gulp.watch(config.styles.src,               ['import:css']);
  gulp.watch(config.images.src,               ['imagemin']);
  gulp.watch(config.cdas.src,                 ['import:cdas']);
  gulp.watch(`${config.sourceDir}index.html`, ['import:html']);

});

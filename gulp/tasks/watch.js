'use strict';

import gulp   from 'gulp';
import config from '../config';

gulp.task('watch', function() {

  // Scripts are automatically watched by Watchify inside Browserify task
  gulp.watch(config.styles.src,               ['import:css']);
  gulp.watch(config.images.src,               ['imagemin']);
  gulp.watch(config.sourceDir + 'index.html', ['import:html']);

});

'use strict';

import gulp from 'gulp';
import config from '../config';

gulp.task('copyCDAs', function() {

  gulp.src(config.sourceDir + 'cdas/*.cda').pipe(gulp.dest(config.buildDir + 'cdas'));

});

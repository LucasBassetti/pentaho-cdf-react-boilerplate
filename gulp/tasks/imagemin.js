'use strict';

import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import imagemin    from 'gulp-imagemin';
import config      from '../config';

gulp.task('imagemin', function() {

  return gulp.src(config.images.src)
    .pipe(gulpif(global.isProd, imagemin()))
    .pipe(gulp.dest(config.images.dest));

});

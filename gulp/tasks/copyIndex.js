'use strict';

import gulp from 'gulp';
import config from '../config';

// const wiredep = require('wiredep').stream;
// const _ = require('lodash');

gulp.task('import:html', ['copyIndex'], function() {
    setTimeout(function() {
        gulp.start('import-html');
    }, 1000);
});

gulp.task('copyIndex', function() {


    // return gulp.src([
    //     config.sourceDir + '*.html',
    //     config.sourceDir + '*.xcdf'
    //   ])
    //   .pipe(wiredep(_.extend({}, config.wiredep)))
    //   .pipe(gulp.dest(config.buildDir));

  gulp.src(config.sourceDir + '*.html').pipe(gulp.dest(config.buildDir));
  gulp.src(config.sourceDir + '*.xcdf').pipe(gulp.dest(config.buildDir));

});

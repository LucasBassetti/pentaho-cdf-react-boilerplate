'use strict';

const argv = require('yargs').argv;

/* START: change these paths */

// bi-server import-export file path
const biServerCommandPath = '../repositories/biserver-ce/import-export.sh';

// Dev (default) environment
let petahoURL           = 'http://localhost:8080/pentaho',
pentahoUsername     = 'Admin',
pentahoPassword     = 'password';

// Set homologation environment and run with -e flag (ex.: gulp -e hom)
if(argv.e === 'hom') {
    petahoURL           = '',
    pentahoUsername     = '',
    pentahoPassword     = '';
}
// Set production environment and run with -e flag (ex.: gulp -e prod)
else if(argv.e === 'prod') {
    petahoURL           = '',
    pentahoUsername     = '',
    pentahoPassword     = '';
}

// Pentaho project path. This will generate the root folder of your
// project in pentaho bi-server
const projectPath      = 'build',
// Pentaho source path. This path will be used to generate a development
// folder in pentaho bi-server
pentahoPath      = '/' + projectPath,
// Pentaho dist path. This path will be used to generate a dist (production)
// folder in pentaho bi-server
pentahoDistPath = '/',
// User file path. NOTE: this path should be relative to your bi-server
zipfilePath      = '../pentaho-cdf-angular-boilerplate/zip/';

const config = {

    biServerCommandPath: biServerCommandPath,
    petahoURL: petahoURL,
    pentahoUsername: pentahoUsername,
    pentahoPassword: pentahoPassword,
    projectPath: projectPath,
    pentahoPath: pentahoPath,
    pentahoDistPath: pentahoDistPath,
    zipfilePath: zipfilePath,

    bower: {
        scripts: './app/bower_components/**/*.js',
        styles: './app/bower_components/**/*.css',
    },

    scripts: {
        src: './app/js/**/*.js',
        dest: './' + projectPath + '/js/',
        ignore: '!./' + projectPath + '/bower_components/**/*.js',
        test: './tests/**/*.js',
        gulp: './gulp/**/*.js'
    },

    images: {
        src: './app/images/**/*.{jpeg,jpg,png,gif}',
        dest: './' + projectPath + '/images/'
    },

    styles: {
        src: './app/styles/**/*.scss',
        dest: './' + projectPath + '/css/'
    },

    sourceDir: './app/',

    buildDir: './' + projectPath + '/',

    testFiles: './tests/**/*.{js,jsx}',

    assetExtensions: [
        'js',
        'css',
        'map',
        'png',
        'jpe?g',
        'gif',
        'svg',
        'eot',
        'otf',
        'ttc',
        'ttf',
        'woff2?'
    ],

    wiredep: {
        exclude: [],
        directory: 'app/bower_components'
    }

};

export default config;

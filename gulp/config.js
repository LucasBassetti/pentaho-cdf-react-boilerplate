'use strict';

/* START: change these paths */

// bi-server import-export file path
const biServerCommandPath = '../biserver-ce/import-export.sh';

// Dev (default) environment
const pentahoURL = 'http://localhost:8080/pentaho';
const pentahoUsername = 'Admin';
const pentahoPassword = 'password';

// Pentaho project path. This will generate the root folder of your
// project in pentaho bi-server
const projectPath      = 'MyDashboard';
// Pentaho source path. This path will be used to generate a development
// folder in pentaho bi-server
const pentahoPath      = '/';
// Pentaho dist path. This path will be used to generate a dist (production)
// folder in pentaho bi-server
const pentahoDistPath  = '/';
// Pentaho source subpath. This subpath will be used as subpath of css and js
// files in bi-server. Note: You should change the index.html to adapt to this
// new path
const pentahoSubPath   = '/my_dashboard/';
// User file path. NOTE: this path should be relative to your bi-server
const zipfilePath      = '../pentaho-cdf-react-boilerplate/zip/';

/* END: change these paths */

const config = {

    biServerCommandPath,
    pentahoURL,
    pentahoUsername,
    pentahoPassword,
    projectPath,
    pentahoPath,
    pentahoSubPath,
    pentahoDistPath,
    zipfilePath,

    scripts: {
        src: './app/js/**/*.js',
        dest: `./${projectPath}${pentahoSubPath}js/`,
        test: './tests/**/*.js',
        gulp: './gulp/**/*.js'
    },

    images: {
        src: './app/images/**/*.{jpeg,jpg,png,gif}',
        dest: `./${projectPath}${pentahoSubPath}images/`
    },

    cdas: {
        src: './app/**/*.cda',
        dest: `./${projectPath}/cdas/`
    },

    styles: {
        src: './app/styles/**/*.scss',
        dest: `./${projectPath}${pentahoSubPath}css/`
    },

    sourceDir: './app/',

    buildDir: `./${projectPath}/`,

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
    ]

};

export default config;

# Pentaho CDF React Boilerplate

Boilerplate to Pentaho [BIServer](https://sourceforge.net/projects/pentaho/files/Business%20Intelligence%20Server/) using React and Community Dashboard Framework (CDF).

### Features

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Redux Promise](https://github.com/acdlite/redux-promise)
* [React Router](https://github.com/ReactTraining/react-router)
* [React ESLint](https://github.com/yannickcr/eslint-plugin-react)
* [ES6](http://es6-features.org/)

### Getting Start

1. Run `npm install`
2. Run `gulp dev` to development and `gulp prod` to production

``` javascript
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
```

### Configuration

1. You can edit the configurations in `gulp/config.js` file

### Known issues

1. When you install some npm module with `npm install` and an error with `define` expression appear, you should open the file imported in `node_modules` and remove all `define(...)` present in the archive. This error is some incompatibility with pentaho requirejs.

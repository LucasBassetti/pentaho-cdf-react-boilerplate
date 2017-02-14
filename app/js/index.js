'use strict';

import React     from 'react';
import ReactDOM  from 'react-dom';

import Routes    from './Routes';

if ( process.env.NODE_ENV !== 'production' ) {
  // Enable React devtools
  window.React = React;
}

render();

function render() {
    if(document.getElementById('app') !== null) {
        ReactDOM.render(Routes, document.getElementById('app'));
    }
    else {
        setTimeout(function() {
            render();
        }, 1000);
    }
}

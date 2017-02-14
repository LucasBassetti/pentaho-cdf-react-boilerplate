'use strict';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router';

import App from './App';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>

      <IndexRoute component={App} />
      <Route path="*" component={App} />

    </Route>
  </Router>
);

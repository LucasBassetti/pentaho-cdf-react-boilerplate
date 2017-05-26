'use strict';

import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

import Dashboard  from './services/dashboard';
import Components from './services/components';

import Container from './components/Container';

class App extends Component {

  constructor(props) {
    super(props);
    
    Dashboard.setDashboard(new dashboard());
    Components.setComponentsClasses(components);
  }

  render() {

    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Container />
      </Provider>
    );
  }
}

export default App;

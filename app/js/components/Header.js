'use strict';

import React from 'react';
import Dashboard from '../services/dashboard';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      console.log(Dashboard.getDashboard());
  }

  render() {
    return (
      <header>

        Header

      </header>
    );
  }

}

export default Header;

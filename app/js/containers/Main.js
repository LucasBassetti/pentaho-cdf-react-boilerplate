'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ExampleList from '../components/ExampleList';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { exampleList } = this.props;

    if(!exampleList || exampleList.length === 0) {
      return <div className="main"></div>;
    }

    return (
      <div className="main">
        <ExampleList list={exampleList} />
      </div>
    );
  }
}

Main.propTypes = {
  exampleList: PropTypes.array
};

function mapStateToProps({ exampleList }) {
  return { exampleList };
}

export default connect(mapStateToProps)(Main);

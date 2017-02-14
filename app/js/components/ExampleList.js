import React, { Component, PropTypes } from 'react';

class ExampleList extends Component {

    renderItems() {
        return this.props.exampleList.map(item => {
            return <li>{item.title}</li>;
        });
    }

    render() {
        return (
            <ul> {this.renderItems()} </ul>
        );
    }
};

ExampleList.propTypes = {
    exampleList: PropTypes.array
};

export default ExampleList;

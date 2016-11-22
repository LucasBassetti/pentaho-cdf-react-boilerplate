'use strict';

import React from 'react';

import Dashboard  from './services/dashboard';
import Components from './services/components';

import Header     from './components/Header';
import Footer     from './components/Footer';

class App extends React.Component {

    constructor(props) {
        super(props);

        Dashboard.setDashboard(dashboard);
        Components.setComponentsClasses(components);
    }

    render() {
        return (
            <div>
                <Header />

                Hello World!

                <Footer />
            </div>
        );
    }
}

export default App;

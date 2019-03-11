import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { realpathSync } from 'fs';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Layout>
                    <BurgerBuilder> </BurgerBuilder>
                </Layout>
            </React.Fragment>
        );
    }
}

export default App;

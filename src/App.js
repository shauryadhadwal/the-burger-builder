import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import About from './containers/About/About';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Layout>
                    <Switch>
                        <Route path="/orders" component={Orders} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/home" component={BurgerBuilder} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/about" component={About} />
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Layout>
            </React.Fragment>
        );
    }
}

export default App;

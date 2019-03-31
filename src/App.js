import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import About from './containers/About/About';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

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
                        <Route path="/logout" component={Logout} />
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Layout>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(null, mapDispatchToProps)(App);

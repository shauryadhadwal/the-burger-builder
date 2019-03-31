import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import About from './containers/About/About';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const ProtectedRoute = (props) => {
    const { path, component } = props;
    if (props.isAuth) {
        return <Route path={path} component={component} />
    }
    else {
        return <Route render={() => <Redirect to="/auth" />} />
    }
}

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <React.Fragment>
                <Layout>
                    <Switch>
                        <Route path="/home" component={BurgerBuilder} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/about" component={About} />
                        <ProtectedRoute path="/orders" component={asyncOrders} isAuth={this.props.isAuth} />
                        <ProtectedRoute path="/checkout" component={asyncCheckout} isAuth={this.props.isAuth} />
                        <ProtectedRoute path="/logout" component={Logout} isAuth={this.props.isAuth} />
                        <Redirect to="/home" />
                    </Switch>
                </Layout>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

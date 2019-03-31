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
                        <ProtectedRoute path="/orders" component={Orders} isAuth={this.props.isAuth} />
                        <ProtectedRoute path="/checkout" component={Checkout} isAuth={this.props.isAuth} />
                        <ProtectedRoute path="/logout" component={Logout} isAuth={this.props.isAuth} />
                        <Redirect from="/" to="/home" />
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

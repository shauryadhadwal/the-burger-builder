import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Auth from './containers/Auth/Auth'

// Lazy Components
const About = React.lazy(() => {
    return import('./containers/About/About');
});
const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});
const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const ProtectedRoute = (props) => {
    const { path, component, render } = props;
    if (props.isAuth) {
        // When lazy components are passed
        if(render){
            return <Route path={path} render={() => render} />
        }
        return <Route path={path} component={component} />
    }
    else {
        return <Route render={() => <Redirect to="/auth" />} />
    }
}

const app = (props) => {

    useEffect(() => {
        props.onTryAutoSignup();
    }, [])

    const routes = (
        <Switch>
            <Route path="/home" component={BurgerBuilder} />
            <Route path="/auth" component={Auth} />
            <Route path="/about" render={() => <About />} />
            <ProtectedRoute path="/orders" render={<Orders />} isAuth={props.isAuth} />
            <ProtectedRoute path="/checkout" render={<Checkout />} isAuth={props.isAuth} />
            <ProtectedRoute path="/logout" component={Logout} isAuth={props.isAuth} />
            <Redirect to="/home" />
        </Switch>
    )

    return (
        <React.Fragment>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>
                    {routes}
                </Suspense>
            </Layout>
        </React.Fragment>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(app);

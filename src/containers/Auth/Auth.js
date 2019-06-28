import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const auth = (props) => {

    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, [])

    const onSubmit = (email, password) => {
        props.onAuth(email, password, isSignup);
    }

    const switchAuthMethod = () => {
        setIsSignup(!isSignup)
    }

    const formikComponent = (props) => {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
        } = props;

        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group htmlFor="email" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder="Enter your email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={(props.error && props.error.field === 'email') || (touched.email && errors.email)
                        }
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        {
                            props.error
                            && props.error.field === 'email'
                            && values.email.length === 0
                            && props.error.message
                        }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group htmlFor="password" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder="Enter your Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={(props.error && props.error.field === 'password') || (touched.email && errors.email)
                        }
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        {
                            props.error
                            && props.error.field === 'password'
                            && values.password.length === 0
                            && props.error.message
                        }
                    </Form.Control.Feedback>
                </Form.Group>
                <p className={classes.OtherErrors}>
                    {props.error
                        && props.error.field === 'other'
                        && props.error.message}
                </p>
                <Button
                    variant="primary"
                    block
                    type="submit"
                    onClick={handleSubmit} >
                    {isSignup ? 'Signup' : 'Login'}
                </Button>
                <hr />
                {
                    isSignup ? (
                        <Fragment>
                            Are you already registered? <span><Button size="sm" variant="warning" onClick={() => { switchAuthMethod(); handleReset() }}>Login</Button></span> instead!
                    </Fragment>
                    ) : (
                            <Fragment>
                                Don't have an account ? <span><Button size="sm" variant="warning" onClick={() => { switchAuthMethod(); handleReset() }}>Register</Button></span> here first!
                        </Fragment>
                        )
                }
            </Form>
        )
    }

    let form = <div className={classes.ContactFormCard}>
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => { onSubmit(values.email, values.password) }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required("Required"),
                password: Yup.string()
                    .min(6)
                    .required("Required"),
            })}
            component={formikComponent}
        />
    </div>

    if (props.loading) {
        form = <Spinner />
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <Fragment>
            {authRedirect}
            <div className={classes.AuthFormCard}>
                <h4>{isSignup ? 'Signup Page' : 'Login Page'}</h4>
                {form}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);



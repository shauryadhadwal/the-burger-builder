import React, { Component, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        isSignup: false
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    onSubmit(email, password) {
        this.props.onAuth(email, password, this.state.isSignup);
    }

    switchAuthMethod() {
        this.setState({ isSignup: !this.state.isSignup });
    }

    render() {
        const formikComponent = (props) => {
            const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                isValid
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
                            isInvalid={(this.props.error && this.props.error.field === 'email') || (touched.email && errors.email)
                            }
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            {
                                this.props.error
                                && this.props.error.field === 'email'
                                && values.email.length === 0
                                && this.props.error.message
                            }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group htmlFor="password" controlId="password">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                            placeholder="Enter your Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={(this.props.error && this.props.error.field === 'password') || (touched.email && errors.email)
                            }
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            {
                                this.props.error
                                && this.props.error.field === 'password'
                                && values.password.length === 0
                                && this.props.error.message
                            }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <p className={classes.OtherErrors}>
                        {this.props.error
                            && this.props.error.field === 'other'
                            && this.props.error.message}
                    </p>
                    <Button
                        variant="primary"
                        block
                        type="submit"
                        onClick={handleSubmit} >
                        {this.state.isSignup ? 'Signup' : 'Login'}
                    </Button>
                    <hr />
                    {
                        this.state.isSignup ? (
                            <Fragment>
                                Are you already registered? <span><Button size="sm" variant="warning" onClick={() => { this.switchAuthMethod(); handleReset() }}>Login</Button></span> instead!
                    </Fragment>
                        ) : (
                                <Fragment>
                                    Don't have an account ? <span><Button size="sm" variant="warning" onClick={() => { this.switchAuthMethod(); handleReset() }}>Register</Button></span> here first!
                        </Fragment>
                            )
                    }
                </Form>
            )
        }

        let form = <div className={classes.ContactFormCard}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => { this.onSubmit(values.email, values.password) }}
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

        if (this.props.loading) {
            form = <Spinner />
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <Fragment>
                {authRedirect}
                <div className={classes.AuthFormCard}>
                    <h4>{this.state.isSignup ? 'Signup Page' : 'Login Page'}</h4>
                    {form}
                </div>
            </Fragment>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);



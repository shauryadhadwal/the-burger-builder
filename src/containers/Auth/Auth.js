import React, { Component, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        isSignup: true
    }

    onSubmit(email, passowrd) {

    }

    switchAuthMethod = () => {
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
                            isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group htmlFor="password" controlId="password">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                            placeholder="Enter your Password"
                            type="text"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.password && !errors.password}
                            isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback >Looks Good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Button
                        variant="secondary"
                        type="button"
                        onClick={handleReset} >
                        {this.state.isSignup ? 'Signup' : 'Login'}
                    </Button>
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
            <hr />
            <div>{
                this.state.isSignup ? (
                    <Fragment>
                        Are you already registered? <span><Button size="sm" variant="warning" onClick={this.switchAuthMethod}>Login</Button></span> instead!
                    </Fragment>
                ) : (
                        <Fragment>
                            Don't have an account ? <span><Button size="sm" variant="warning" onClick={this.switchAuthMethod}>Register</Button></span> here first!
                        </Fragment>
                    )
            }
            </div>
        </div>

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.AuthFormCard}>
                <h4>{this.state.isSignup ? 'Signup Page' : 'Login Page'}</h4>
                {form}
            </div>
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


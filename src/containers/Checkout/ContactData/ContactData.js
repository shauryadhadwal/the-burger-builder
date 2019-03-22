import React, { Component, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		deliveryType: ''
	}

	orderHandler = (values) => {

		const order = {
			ingredients: this.props.ingr,
			price: this.props.price,
			orderData: values
		};

		this.props.onOrderBurger(order);
	}

	render() {

		let form = <div className={classes.ContactFormCard}>
			<Formik
				initialValues={{ name: '', email: '', street: '', postalCode: '', delivery: 'Speedy' }}
				onSubmit={(values) => { this.orderHandler(values) }}
				validationSchema={Yup.object().shape({
					name: Yup.string()
						.required("Required"),
					email: Yup.string()
						.email()
						.required("Required"),
					street: Yup.string()
						.required("Required"),
					postalCode: Yup.string()
						.required("Required")
				})}
			>
				{(props) => {
					const {
						values,
						touched,
						errors,
						dirty,
						isSubmitting,
						handleChange,
						handleBlur,
						handleSubmit,
						handleReset,
						isValid
					} = props;
					return (
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Group htmlFor="name" controlId="name">
								<Form.Label>Name</Form.Label>
								<Form.Control
									placeholder="Enter your name"
									type="text"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									isValid={touched.name && !errors.name}
									isInvalid={touched.name &&!!errors.name}
								/>
								<Form.Control.Feedback >Looks Good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group htmlFor="email" controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									placeholder="Enter your email"
									type="text"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									isValid={touched.email && !errors.email}
									isInvalid={touched.email &&!!errors.email}
								/>
								<Form.Control.Feedback >Looks Good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group htmlFor="street" controlId="street">
								<Form.Label>Street</Form.Label>
								<Form.Control
									placeholder="Enter your Street Address"
									type="text"
									value={values.street}
									onChange={handleChange}
									onBlur={handleBlur}
									isValid={touched.street && !errors.street}
									isInvalid={touched.street &&!!errors.street}
								/>
								<Form.Control.Feedback >Looks Good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group htmlFor="postalCode" controlId="postalCode">
								<Form.Label>Postal Code</Form.Label>
								<Form.Control
									placeholder="Enter your Postal Code"
									type="text"
									value={values.postalCode}
									onChange={handleChange}
									onBlur={handleBlur}
									isValid={touched.postalCode && !errors.postalCode}
									isInvalid={touched.postalCode &&!!errors.postalCode}
								/>
								<Form.Control.Feedback >Looks Good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">{errors.postalCode}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group htmlFor="delivery" controlId="delivery">
								<Form.Label>Delivery Method</Form.Label>
								<Form.Control
									as="select"
									value={values.delivery}
									onChange={handleChange}
									onBlur={handleBlur}
								>
									<option>Speedy</option>
									<option>Regular</option>
								</Form.Control>
							</Form.Group>
							<Button
								variant="secondary"
								type="button"
								onClick={handleReset}
								disabled={!dirty}
							>
								Reset
							</Button>
							<Button
								variant="primary"
								type="submit"
								disabled={isSubmitting}
							>
								Order
							</Button>
						</Form>
					)
				}}
			</Formik>
		</div>

		if (this.props.loading) {
			form = <Spinner />
		}
		return (
			<Fragment>
				{form}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingr: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (order) => dispatch(actions.purchaseBurger(order))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
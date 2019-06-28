import React, { Fragment } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const checkout = (props) => {

	const continueHandler = () => {
		props.history.replace('/checkout/contact-data');
	}

	const cancelHandler = () => {
		props.history.goBack();
	}

	let summary = (
		<Fragment>
			<CheckoutSummary
				ingredients={props.ingr}
				checkoutContinued={continueHandler}
				checkoutCancelled={cancelHandler} />

			<Route
				path={props.match.path + '/contact-data'}
				component={ContactData} />
		</Fragment>
	)

	if (!props.ingr) {
		summary = <Redirect to={'/'} />
	}

	const purchasedRedirect = props.purchased ? <Redirect to={'/'} /> : null;

	return (
		<div className={classes.CardsContainer}>
			{purchasedRedirect}
			{summary}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		ingr: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
}

export default connect(mapStateToProps)(checkout);
import React, { Component, Fragment } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

	continueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	cancelHandler = () => {
		this.props.history.goBack();
	}

	render() {
		let summary = (
			<Fragment>
				<CheckoutSummary
					ingredients={this.props.ingr}
					checkoutContinued={this.continueHandler}
					checkoutCancelled={this.cancelHandler} />

				<Route
					path={this.props.match.path + '/contact-data'}
					component={ContactData} />
			</Fragment>
		)

		if (!this.props.ingr) {
			summary = <Redirect to={'/'} />
		}

		const purchasedRedirect = this.props.purchased ? <Redirect to={'/'} /> :  null;

		return (
			<div className={classes.CardsContainer}>
				{purchasedRedirect}
				{summary}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingr: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
}

export default connect(mapStateToProps)(Checkout);
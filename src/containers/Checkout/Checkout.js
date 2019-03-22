import React, { Component, Fragment } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

	continueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	cancelHandler = () => {
		this.props.history.goBack();
	}

	render() {
		return (
			<div className={classes.CardsContainer}>
				<CheckoutSummary
					ingredients={this.props.ingr}
					checkoutContinued={this.continueHandler}
					checkoutCancelled={this.cancelHandler} />
				<Route
					path={this.props.match.path + '/contact-data'}
					component={ContactData} />
					</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingr: state.ingredients,
	};
}

export default connect(mapStateToProps)(Checkout);
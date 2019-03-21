import React, { Component, Fragment } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {

	state = {
		ingredients: null,
		price: 0
	}

	componentWillMount() {
		const params = new URLSearchParams(this.props.location.search)
		const ingredients = {};
		for (let param of params) {
			ingredients[param[0]] = +param[1];
		}
		this.setState({ ingredients: ingredients })
	}

	continueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	cancelHandler = () => {

	}

	render() {
		return (
			<div className={classes.CardsContainer}>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutContinued={this.continueHandler}
					checkoutCancelled={this.cancelClicked} />
				<Route
					path={this.props.match.path + '/contact-data'}
					render={(props) => (<ContactData ingredients={this.state.ingredients} price={50} {...props}/>)} />
			</div>
		);
	}
}

export default Checkout;
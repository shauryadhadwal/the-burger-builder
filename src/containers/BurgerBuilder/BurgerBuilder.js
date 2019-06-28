import React, { useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import classes from './BurgerBuilder.css';
import Constants from '../../Constants';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const burgerBuilder = (props) => {

	const [purchasing, setPurchasing] = useState(false);
	const [loading] = useState(false);

	useEffect(() => {
		props.onInitIngredients();
		props.onPurchaseInit();
	}, [])

	// Method to open modal for viewing order summary
	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			setPurchasing(true);
		}
		else {
			props.onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	}

	// When an order has been cancelled by the customer
	const purchaseCancelHandler = () => {
		setPurchasing(false);
	}

	// Method to handle 'order placed'. Closes the modal
	const purchaseContinueHandler = () => {
		props.history.push({
			pathname: '/checkout',
		});
	}

	// Method to enable or disable the Order button based on conditionals
	const updatePurchaseState = () => {
		return props.price > Constants.BASE_PRICE;
	}

	// Disable button for removing ingredients if none are there.
	const disabledWhenMinItems = {
		...props.ingr
	}
	for (let key in disabledWhenMinItems) {
		disabledWhenMinItems[key] = disabledWhenMinItems[key] <= 0;
	}
	// Disable button for adding more ingredients if max have been added
	const disabledWhenMaxItems = {
		...props.ingr
	}
	for (let key in disabledWhenMaxItems) {
		disabledWhenMaxItems[key] = disabledWhenMaxItems[key] >= Constants.MAX_INGREDIENT[key];
	}

	let orderSummary = <OrderSummary
		ingredients={props.ingr}
		totalPrice={props.price} />

	if (loading) {
		orderSummary = <Spinner />
	}

	let burger = props.error ? <h1>Error in fetching data from Server</h1> : <Spinner />

	if (props.ingr) {
		burger = <React.Fragment>
			<Burger ingredients={props.ingr} />
			<BuildControls
				ingredients={props.ingr}
				ingredientAdded={props.onIngredientAdded}
				ingredientRemoved={props.onIngredientRemoved}
				disabledWhenMinItems={disabledWhenMinItems}
				disabledWhenMaxItems={disabledWhenMaxItems}
				totalPrice={props.price}
				purchasable={updatePurchaseState()}
				ordering={purchaseHandler}
				isAuthenticated={props.isAuthenticated} />
		</React.Fragment>
	}

	return (
		<React.Fragment>
			<Modal
				show={purchasing}
				success={purchaseContinueHandler}
				closed={purchaseCancelHandler} >
				{orderSummary}
			</Modal>
			<div className={classes.CardsContainer}>
				{burger}
			</div>
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	return {
		ingr: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingrName) => dispatch(actions.addIngredient(ingrName)),
		onIngredientRemoved: (ingrName) => dispatch(actions.removeIngredient(ingrName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onPurchaseInit: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
import React, { Component } from 'react';
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

class BurgerBuilder extends Component {

	state = {
		purchasable: false,
		purchasing: false,
		loading: false
	}

	componentDidMount() {
		this.props.onInitIngredients();
		this.props.onPurchaseInit();

	}

	// Method to open modal for viewing order summary
	purchaseHandler = () => {
		if(this.props.isAuthenticated){
		this.setState({ purchasing: true });
		}
		else{
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}

	// When an order has been cancelled by the customer
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	// Method to handle 'order placed'. Closes the modal
	purchaseContinueHandler = () => {
		this.props.history.push({
			pathname: '/checkout',
		});
	}

	// Method to enable or disable the Order button based on conditionals
	updatePurchaseState(){
		return this.props.price > Constants.BASE_PRICE ;
	}

	// Method to ensure only two decimal places are stored
	convertTo2DecimalPlaces = (num) => {
		return parseFloat(num.toFixed(2))
	}

	render() {

		// Disable button for removing ingredients if none are there.
		const disabledWhenMinItems = {
			...this.props.ingr
		}
		for (let key in disabledWhenMinItems) {
			disabledWhenMinItems[key] = disabledWhenMinItems[key] <= 0;
		}
		// Disable button for adding more ingredients if max have been added
		const disabledWhenMaxItems = {
			...this.props.ingr
		}
		for (let key in disabledWhenMaxItems) {
			disabledWhenMaxItems[key] = disabledWhenMaxItems[key] >= Constants.MAX_INGREDIENT[key];
		}

		let orderSummary = <OrderSummary
			ingredients={this.props.ingr}
			totalPrice={this.props.price} />

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		let burger = this.props.error ? <h1>Error in fetching data from Server</h1> : <Spinner />

		if (this.props.ingr) {
			burger = <React.Fragment>
				<Burger ingredients={this.props.ingr} />
				<BuildControls
					ingredients={this.props.ingr}
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemoved={this.props.onIngredientRemoved}
					disabledWhenMinItems={disabledWhenMinItems}
					disabledWhenMaxItems={disabledWhenMaxItems}
					totalPrice={this.props.price}
					purchasable={this.updatePurchaseState()}
					ordering={this.purchaseHandler} 
					isAuthenticated={this.props.isAuthenticated}/>
			</React.Fragment>
		}

		return (
			<React.Fragment>
				<Modal
					show={this.state.purchasing}
					success={this.purchaseContinueHandler}
					closed={this.purchaseCancelHandler} >
					{orderSummary}
				</Modal>
				<div className={classes.CardsContainer}>
					{burger}
				</div>
			</React.Fragment>
		)
	}
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
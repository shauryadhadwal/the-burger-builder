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

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: Constants.BASE_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    // Method to open modal for viewing order summary
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    // When an order has been cancelled by the customer
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    // Method to handle 'order placed'. Closes the modal
    purchaseContinueHandler = () => {

        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                address: {

                    name: 'Shaurya Dhadwal',
                    zipCode: '160101',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false });
                console.log(err);                
            });

    }

    // Method to enable or disable the Order button based on conditionals
    updatePurchaseState = (updatedPrice) => {
        this.setState({ purchasable: updatedPrice > Constants.BASE_PRICE });
    }

    // Method to ensure only two decimal places are stored
    convertTo2DecimalPlaces = (num) => {
        return parseFloat(num.toFixed(2))
    }

    // Method to add elements between burger buns
    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const updatedPrice = this.convertTo2DecimalPlaces(this.state.totalPrice + Constants.INGREDIENT_PRICES[type]);

        this.updatePurchaseState(updatedPrice);

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
    }

    // Method to remove elements from between burger buns
    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] === 0)
            return;

        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const updatedPrice = this.convertTo2DecimalPlaces(this.state.totalPrice - Constants.INGREDIENT_PRICES[type]);

        this.updatePurchaseState(updatedPrice);

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
    }

    render() {

        // Disable button for removing ingredients if none are there.
        const disabledWhenMinItems = {
            ...this.state.ingredients
        }
        for (let key in disabledWhenMinItems) {
            disabledWhenMinItems[key] = disabledWhenMinItems[key] <= 0;
        }
        // Disable button for adding more ingredients if max have been added
        const disabledWhenMaxItems = {
            ...this.state.ingredients
        }
        for (let key in disabledWhenMaxItems) {
            disabledWhenMaxItems[key] = disabledWhenMaxItems[key] >= Constants.MAX_INGREDIENT[key];
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice} />

        if (this.state.loading) {
            orderSummary = <Spinner />
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
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredients={this.state.ingredients}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledWhenMinItems={disabledWhenMinItems}
                        disabledWhenMaxItems={disabledWhenMaxItems}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordering={this.purchaseHandler} />
                </div>
            </React.Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
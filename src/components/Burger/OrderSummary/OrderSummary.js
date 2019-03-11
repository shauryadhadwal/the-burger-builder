import React from 'react';
// import classes from './OrderSummary.css'
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}> {igKey} : {props.ingredients[igKey]}</li>
        });
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Order Total : <strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout ?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Success</Button>
        </React.Fragment>
    );
};

export default orderSummary;
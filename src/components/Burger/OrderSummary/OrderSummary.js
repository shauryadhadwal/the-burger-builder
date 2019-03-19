import React from 'react';

const orderSummary = React.memo((props) => {

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
        </React.Fragment>
    );
});

export default orderSummary;
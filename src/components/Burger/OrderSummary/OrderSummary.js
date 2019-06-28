import React from 'react';

const orderSummary = React.memo((props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <p key={igKey}> {igKey} : {props.ingredients[igKey]}</p>
        });

    const divStyle = {
        textAlign: 'center'
    }

    return (
        <React.Fragment>
            <div style={divStyle}>
                <h3>Your Order</h3>
                    {ingredientSummary}
                <p>Order Total : <strong>INR {props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout ?</p>
            </div>
        </React.Fragment>
    );
});

export default orderSummary;
import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

// const controls = [
//     { label: 'Meat', type: 'meat' },
//     { label: 'Bacon', type: 'bacon' },
//     { label: 'Salad', type: 'salad' },
//     { label: 'Cheese', type: 'cheese' },
// ];

const buildControls = (props) => {

    const controls = Object.keys(props.ingredients)
        .map(igKey => {
            return {
                'label': igKey[0].toUpperCase() + igKey.substring(1),
                'type': igKey,
                'quantity': props.ingredients[igKey]
            }
        });
    return (
        <div className={classes.BuildControlsCard}>
            <div className={classes.BuildControls}>
                <h4>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></h4>
                {controls.map(ctrl => (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        quantity={ctrl.quantity}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        disabledMin={props.disabledWhenMinItems[ctrl.type]}
                        disabledMax={props.disabledWhenMaxItems[ctrl.type]} />
                ))}
                <button type="button"
                    className="btn btn-primary btn-lg mt-2"
                    disabled={!props.purchasable}
                    onClick={props.ordering}>{props.isAuthenticated ? 'Order Now' : 'Signup to Order'}</button>
            </div>
        </div>
    );
};

export default buildControls;
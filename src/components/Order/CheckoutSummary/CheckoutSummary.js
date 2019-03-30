import React from 'react';
import Burger from '../../Burger/Burger';
import Button from 'react-bootstrap/Button';

import classes from './CheckoutSummary.css';

const checkout = (props) => {
	return (
		<div>
			<Burger ingredients={props.ingredients} />
			<div className={classes.ActionsContainer}>
				<Button variant='primary' block onClick={props.checkoutContinued}>Looks Good</Button>
				<div readOnly></div>
				<Button variant='secondary' block onClick={props.checkoutCancelled}>Something is missing!</Button>
			</div>
		</div>
	);
}

export default checkout;
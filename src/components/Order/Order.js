import React from 'react';
import classes from './Order.css';

const order = (props) => {
	let ingredients = <div>
		Ingredients:
		{Object.keys(props.ingredients).map(igKey => {
			return (
				<span
					key={igKey}
					className={classes.IngredientBorder}>
					{igKey}({props.ingredients[igKey]})
				</span>
			)
		})}
	</div>

	return (
		<div className={classes.OrderCard}>
			{ingredients}
			<p>Order Price: <strong>INR {props.price}</strong></p>
		</div>
	);
}

export default order;
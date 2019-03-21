import React, { Component, Fragment } from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from 'react-bootstrap/Button';

const checkout = (props) => {
	return (
			<div>
				<Burger ingredients={props.ingredients} />
				<Button variant='primary' style={{width:'100%'}} onClick={props.checkoutContinued}>Looks Good</Button>
				<br />
				<Button variant='secondary' style={{width:'100%'}} onClick={props.checkoutCancelled}>Something is missing!</Button>
				<br />
			</div>
	);
}

export default checkout;
import React from 'react';
import classes from './Order.css';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const order = (props) => {
	let ingredients = <ListGroup variant="flush">
		<ListGroup.Item><strong>Ingredients</strong></ListGroup.Item>
		{
			Object.keys(props.ingredients).map(igKey => {
				return <ListGroup.Item key={igKey}>{igKey.toUpperCase()} : {props.ingredients[igKey]}</ListGroup.Item>
			})}
	</ListGroup>

	let address = <ListGroup variant="flush">
		<ListGroup.Item><strong>Address</strong></ListGroup.Item>
		<ListGroup.Item>Name: {props.address.name}</ListGroup.Item>
		<ListGroup.Item>Street: {props.address.street}</ListGroup.Item>
		<ListGroup.Item>Zip: {props.address.postalCode}</ListGroup.Item>
		<ListGroup.Item>Delivery Type: {props.address.delivery}</ListGroup.Item>
	</ListGroup>;

	return (
		<div className={classes.OrderCard}>
			<Container>
				<Row>
					<Col>
						<p className={classes.PriceBox}>Total Amount: <strong>INR {props.price}</strong></p>
						<p>{props.address.email}</p>
					</Col>
				</Row>
				<Row>
					<Col sm="12" md="6">
						{address}
					</Col>
					<Col sm="12" md="6">
						{ingredients}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default order;
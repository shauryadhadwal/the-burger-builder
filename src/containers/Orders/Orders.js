import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';

const orders = (props) => {

    const [loading, setLoading] = useState(true); 
    const [ordersList, setOrdersList] = useState([]); 

    useEffect(() => {

        const queryParams = `?auth=${props.token}&orderBy="userId"&equalTo="${props.userId}"`;

        axios.get('/orders.json' + queryParams)
            .then(res => {
                let fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key });
                }
                setLoading(false);
                setOrdersList(fetchedOrders);
            })
            .catch(err => {
                setLoading(false);
            })
    }, [])


    let ordersRender =
        ordersList.map(order => (
            <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price} address={order.orderData} />
        ))

    if (loading) {
        ordersRender = <Spinner />
    }

    return (
        <Fragment>
            <div className={classes.OrderListContainer}>
                {ordersRender}
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
import React, { Fragment, Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {

    state = {
        loading: true,
        orders: []
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                let fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({...res.data[key], id: key});
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <Fragment>      
            {this.state.orders.map(order => (
                <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
            ))}
            </Fragment>
        );
    }
}

export default withErrorHandler(Orders, axios);
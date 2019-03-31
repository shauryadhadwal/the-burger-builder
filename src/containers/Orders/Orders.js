import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
// TODO: Imrove UI for orders

class Orders extends Component {

    state = {
        loading: true,
        orders: []
    }

    componentDidMount() {
        axios.get('/orders.json?auth=' + this.props.token)
            .then(res => {
                let fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {

        let orders =
            this.state.orders.map(order => (
                <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))

        if (this.state.loading) {
            orders = <Spinner />
        }
        return (
            <Fragment>
                {orders}
            </Fragment>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
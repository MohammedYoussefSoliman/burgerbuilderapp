import React, { Component } from 'react'
import {connect} from 'react-redux';
import {fetchingOrders} from '../store/actions/index';
import Order from '../components/Order/Order'
import axios from '../axios-order'
import classes from './Orders.css'
import Spinner from '../components/UI/spinner/spinner'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'

export class Orders extends Component {

    state = {
        orders: []
    }

    componentDidMount() {
        this.props.onFetchingOrders()
    }

    

    render() {

        return (
            <>
                {this.props.loading && <Spinner />}
                {
                    this.props.orders.map(order => {
                        return <Order key={order.id} price={+order.price} ings={order.ingredients} />
                    })
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        price: state.burgerReducer.intialPrice,
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading
    }
}

const mapDispatchToProps = dispatch=> {
    return {
        onFetchingOrders: ()=>dispatch(fetchingOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))

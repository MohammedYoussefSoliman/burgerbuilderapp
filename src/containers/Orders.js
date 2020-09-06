import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux';
import {fetchingOrders} from '../store/actions/index';
import Order from '../components/Order/Order'
import axios from '../axios-order'
import classes from './Orders.css'
import Spinner from '../components/UI/spinner/spinner'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'

const Orders = ({onFetchingOrders, token, userId, loading, orders}) => {

    // const [orders, setOrders] = useState([]);

    useEffect(()=>{
        onFetchingOrders(token,userId)
    },[])

    return (
        <>
            {loading && <Spinner />}
            {
                orders.map(order => {
                    return <Order key={order.id} price={+order.price} ings={order.ingredients} />
                })
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        price: state.burgerReducer.intialPrice,
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch=> {
    return {
        onFetchingOrders: (token, userId)=>dispatch(fetchingOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))

import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseStart = () => {
    return {
        type: actionTypes.Purchase_Burger_Start
    }
}

export const purchaseBurgerDataSuccess = (orderData, orderId)=> {
    return {
        type: actionTypes.Purchase_Burger_Success,
        orderData,
        id: orderId
    }
}

export const purchaseBurgerDataFailed = ()=> {
    return {
        type: actionTypes.Purchase_Burger_Fail,
    }
}

export const purchaseBurgerData = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStart())
        axios.post('/orders.json?auth='+token, orderData)
        .then(res => {
            dispatch(purchaseBurgerDataSuccess(orderData, res.data.name))
        })
        .catch(err => 
            dispatch(purchaseBurgerDataFailed()))
    }
}

export const purchasedBurger = () => {
    return {
        type: actionTypes.Purchased
    }
}

// Hanlde orders

export const fetchingOrdersStart = () => {
    return {
        type: actionTypes.FetchOrdersStart
    }
}

export const fetchingOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FetchOrdersSuccess,
        orders
    }
}

export const fetchingOrdersFailed = (error) => {
    return {
        type: actionTypes.FetchOrdersFailed,
        error
    }
}

export const fetchingOrders = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        dispatch(fetchingOrdersStart())
        axios.get('/orders.json'+queryParams).then(res =>{
            const orders = [];
            for(let key in res.data) {
                orders.push({
                    id: key,
                    ...res.data[key]
                })
            }
            dispatch(fetchingOrdersSuccess(orders))
        }).catch(err=>{
            dispatch(fetchingOrdersFailed(err))
        })
    }
}
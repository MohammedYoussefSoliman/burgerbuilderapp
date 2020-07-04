import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.Purchase_Burger_Start:
            return {
                ...state,
                loading: true
            }
        case actionTypes.Purchase_Burger_Success:
            const newOrder = {
                id: action.id,
                ...action.orderData
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.Purchase_Burger_Fail:
            return {
                ...state,
                loading: false
            }
        case actionTypes.Purchased:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FetchOrdersStart:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FetchOrdersSuccess:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FetchOrdersFailed:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        default: return state
    }
}

export default reducer
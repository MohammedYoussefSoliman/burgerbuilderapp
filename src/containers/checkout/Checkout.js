import React, {  } from 'react'
import { Route, Redirect } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const Checkout = props => {

    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()){
    //         if(param[0] === 'price') {
    //             price = +param[1]
    //         }else{
    //             ingredients[param[0]] = +param[1]
    //         }
    //         this.setState({ingredients: ingredients, price:price})
    //     }
    // }

    const checkoutCancelHandler = () => {
        props.history.goBack()
    }

    const checkoutContinueHandler = (ingredients) => {
        if(ingredients){
            props.history.replace('checkout/contact-data')
        }else{
            return
        }
        
    }

    return (
        <>
            {props.ings && 
            <>
            <CheckoutSummary
            ingredients={props.ings}
            checkoutCancelled={checkoutCancelHandler}
            checkoutContinued={()=> {checkoutContinueHandler(props.ings)}}/>
            <Route path={props.match.path + '/contact-data'}
            component={ContactData}/>
            </>}
            {!props.ings && <Redirect to='/'/>}
            {props.purchased && <Redirect to='/'/>}
        </>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.intialPrice,
        purchased: state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(Checkout)

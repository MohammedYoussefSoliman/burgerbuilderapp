import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

export class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

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

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = (ingredients) => {
        if(ingredients){
            this.props.history.replace('checkout/contact-data')
        }else{
            return
        }
        
    }



    render() {
        return (
            <>
                {this.props.ings && 
                <>
                <CheckoutSummary
                ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelHandler}
                checkoutContinued={()=> {this.checkoutContinueHandler(this.props.ings)}}/>
                <Route path={this.props.match.path + '/contact-data'}
                component={ContactData}/>
                </>}
                {!this.props.ings && <Redirect to='/'/>}
                {this.props.purchased && <Redirect to='/'/>}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.intialPrice,
        purchased: state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(Checkout)

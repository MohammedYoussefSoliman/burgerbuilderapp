import React, { useState } from 'react'

import Button from '../../../components/UI/button/Button'
import Spinner from '../../../components/UI/spinner/spinner'
import Input from '../../../components/UI/input/input'
import classes from './ContactData.css'
import {connect} from 'react-redux'

import { purchaseBurgerData } from '../../../store/actions/index'
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    regex:''
                    
                },
                valid: false,
                entered: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true,
                    regex:''
                    
                },
                valid: false,
                entered: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your phone number'
                },
                value: '',
                validation: {
                    required: true,
                    length: 11,
                    regex:'',

                },
                valid: false,
                entered: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your countery'
                },
                value: '',
                validation: {
                    required: true,
                    regex:'',

                },
                valid: false,
                entered: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email Address'
                },
                value: '',
                validation: {
                    required: true,
                    regex:'',

                },
                valid: false,
                entered: false
            },
            deleviryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'normal', displayValue: 'normal'},
                        {value: 'fastest', displayValue: 'fastest'},
                        {value: 'cheap', displayValue: 'cheap'}
                    ]
                },
                value: '',
                validation: {},
                valid: true,
            },
        });
       const [isFormValid, setIsFormValid] = useState(false)


    const orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for(let id in orderForm) {
            formData[id]=orderForm[id].value
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            costumer: formData,
            userId: props.userId
        }
        props.onOrder(order, props.token)

    }

    const checkValidity = (value, rules)=> {
        let isValid = true

        if(rules.required) {
            isValid = value.trim(' ') !== '' && isValid
        }
        if(rules.length) {
            isValid = value.length === 11 && isValid
        }

        return isValid

    }

    const inputChangeHandler = (event, id) => {
        const ordForm = {...orderForm}
        const formElement = ordForm[id]
        const updatedElement = {...formElement}
         updatedElement.value = event.target.value;
         updatedElement.entered = true;
         if(updatedElement.validation) {updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)}
         
         ordForm[id] = updatedElement;
        
         let isFormValid = true;
         for(let key in ordForm) {
            isFormValid = ordForm[key].valid && isFormValid
            // console.log(orderForm[key].valid)
        }
        setOrderForm(ordForm)
        setIsFormValid(isFormValid)

     }
 
        let formArr = []
        for(let key in orderForm) {
            formArr.push({
                id: key,
                config: orderForm[key]
            })
        }

        let form = (
            <form onSubmit={orderHandler}>
                {formArr.map(formIn =><Input
                key={formIn.id}
                elementType={formIn.config.elementType}
                elementConfig={formIn.config.elementConfig}
                invalid={!formIn.config.valid}
                shouldValidtate={formIn.config.validation}
                entered={formIn.config.entered}
                value={formIn.config.value}
                changed={(event)=>{inputChangeHandler(event, formIn.id)}} />)}
                <Button btnType="Success" clicked disabled={!isFormValid}>Order</Button>
            </form>
        )
        return (
            <div className={classes.ContactData}>

            {!props.loading && 
            <>
            <h4>Enter your Contact Data</h4>
                {form}
            </>
            }

            {props.loading && <Spinner/>}
            
            </div>
        )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.intialPrice,
        loading: state.orderReducer.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (data, token) => {dispatch(purchaseBurgerData(data, token))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))

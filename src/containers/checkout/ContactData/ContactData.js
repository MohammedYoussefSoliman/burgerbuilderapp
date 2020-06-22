import React, { Component } from 'react'

import Button from '../../../components/UI/button/Button'
import Spinner from '../../../components/UI/spinner/spinner'
import Input from '../../../components/UI/input/input'
import classes from './ContactData.css'
import {connect} from 'react-redux'

import axios from '../../../axios-order'

export class ContactData extends Component {

    state= {
        orderForm: {
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
        },
        isFormValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        let formData = {};
        for(let id in this.state.orderForm) {
            formData[id]=this.state.orderForm[id].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            costumer: formData
        }

        axios.post('/orders.json', order)
        .then(res => {
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({loading: false})
            console.log(err)})

    }

    checkValidity(value, rules) {
        let isValid = true

        if(rules.required) {
            isValid = value.trim(' ') !== '' && isValid
        }
        if(rules.length) {
            isValid = value.length === 11 && isValid
        }

        return isValid

    }

    inputChangeHandler = (event, id) => {
        const orderForm = {...this.state.orderForm}
        const formElement = orderForm[id]
        const updatedElement = {...formElement}
         updatedElement.value = event.target.value;
         updatedElement.entered = true;
         if(updatedElement.validation) {updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation)}
         
         orderForm[id] = updatedElement;
        
         let isFormValid = true;
         for(let key in orderForm) {
            isFormValid = orderForm[key].valid && isFormValid
            // console.log(orderForm[key].valid)
            console.log(isFormValid)
        }
        this.setState({orderForm: orderForm, isFormValid: isFormValid})
        console.log(isFormValid)
     }
    
    render() {
 
        let formArr = []
        for(let key in this.state.orderForm) {
            formArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formArr.map(formIn =><Input
                key={formIn.id}
                elementType={formIn.config.elementType}
                elementConfig={formIn.config.elementConfig}
                invalid={!formIn.config.valid}
                shouldValidtate={formIn.config.validation}
                entered={formIn.config.entered}
                value={formIn.config.value} changed={(event)=>{this.inputChangeHandler(event, formIn.id)}} />)}
                <Button btnType="Success" clicked disabled={!this.state.isFormValid}>Order</Button>
            </form>
        )
        return (
            <div className={classes.ContactData}>

            {!this.state.loading && 
            <>
            <h4>Enter your Contact Data</h4>
                {form}
            </>
            }

            {this.state.loading && <Spinner/>}
            
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.intialPrice
    }
}

export default connect(mapStateToProps)(ContactData)

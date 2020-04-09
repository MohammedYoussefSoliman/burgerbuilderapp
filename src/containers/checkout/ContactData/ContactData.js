import React, { Component } from 'react'

import Button from '../../../components/UI/button/Button'
import Spinner from '../../../components/UI/spinner/spinner'
import classes from './ContactData.css'

import axios from '../../../axios-order'

export class ContactData extends Component {

    state= {
        name: '',
        email: '',
        address: {
            street: '',
            phone: ''
        },
        loading: false
    }

    orderHandler = () => {
        this.setState({loading: true})

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            costumer: {
                name: 'Mohammed Soliman',
                address: {
                    street: '8 Shafeek Ghaly',
                    zipCode: '12617',
                    country: 'Egypt'
                },
                email: 'soliman@mo.com'
            },
            deleviryMethod: 'fastest'
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

    render() {
        return (
            <div className={classes.ContactData}>

            {!this.state.loading && 
            <>
            <h4>Enter your  Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Enter you name"/>
                    <input type="text" name="email" placeholder="Enter you email"/>
                    <input type="text" name="street" placeholder="Enter you street"/>
                    <input type="text" name="phone" placeholder="Enter you phone number"/>
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
            </>
            }

            {this.state.loading && <Spinner/>}
            
            </div>
        )
    }
}

export default ContactData

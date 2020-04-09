import React, { Component } from 'react'

import Order from '../components/Order/Order'
import axios from '../axios-order'
// import classes from './Orders.css'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'

export class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(res =>{
            const orders = [];
            for(let key in res.data) {
                orders.push({
                    id: key,
                    ...res.data[key]
                })
            }
            this.setState({orders: orders, loading: false})
        }).catch(err=>{
            this.setState({loading: false})
        })
    }

    

    render() {

        return (
            <div>
                {
                    this.state.orders.map(order => {
                        return <Order key={order.id} price={+order.price} ings={order.ingredients} />
                    })
                }
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)

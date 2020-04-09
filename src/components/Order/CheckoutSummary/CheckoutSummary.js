import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../../components/UI/button/Button'
import classes from './checkoutSummary.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummery}>
            <h1>We hope you find it tasty</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary
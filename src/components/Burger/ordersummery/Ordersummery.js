import React from 'react';

import Button from '../../UI/button/Button'

const Ordersummery = ({ingredients, pass, close, price}) => {

        const gredientsummery = Object.keys(ingredients).map(ingkey => {
            return (
            <li key={ingkey}><span style={{textTransform: 'capitalize'}}>{ingkey}: </span>{ingredients[ingkey]}</li>
            )
        })

    return (
        <>
            <h3>Your Order</h3>
            <p>A deleciouse burger with the following ingredients:</p>
            <ul>
                {gredientsummery}
            </ul>
            <p>Burger Price<strong>{price.toFixed(2)}</strong></p>
            <Button btnType="Success" clicked={pass}>Continue</Button>
            <Button btnType="Danger" clicked={close}>Cancel</Button>
        </>
    );
}

export default Ordersummery;

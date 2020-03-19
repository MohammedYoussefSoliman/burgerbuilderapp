import React from 'react';

const Ordersummery = ({ingredients}) => {

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
        </>
    );
}

export default Ordersummery;

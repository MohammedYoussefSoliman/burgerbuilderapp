import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const BuildControls = ({Addings, deductings, disabled, price, purchasable, purchasing}) => {

    const controls = [
        {ing: 'salad'},
        {ing: 'cheese'},
        {ing: 'bacon'},
        {ing: 'meat'}
    ]

    return (
        <div className={classes.BuildControls}>
            <p>Burger Price<strong>{price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl
                    ctrlType={ctrl.ing}
                    key={ctrl.ing} add={()=>{Addings(ctrl.ing)}} deduct={()=>{deductings(ctrl.ing)}} disabled={disabled[ctrl.ing]}/>
            })}

            <button className={classes.OrderButton} disabled={!purchasable} onClick={purchasing}>Order Now</button>
        </div>
    );
}

export default BuildControls;
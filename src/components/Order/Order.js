import React from 'react';

import classes from './Order.css';

const styles = {
    border: '1px solid #f44',
    display: 'inline-block',
    padding: '10px 15px',
    margin: 'auto 10px',
    borderRadius: '4px',
    color: '#fff',
    background: '#f66'
}

const Order = ({ings, price}) => {

    // const [ingredients, setIngredients] = useState([])

    const fetchedIngs = [];
    for(let key in ings) {
        fetchedIngs.push({
            name: key,
            amount: ings[key]
        })
    }

   const ingredients = fetchedIngs.map(ing=> {
   return <span style={styles}>{ing.name} ({ing.amount})</span>
   })
    return (
        <div className={classes.Order}>
            <p style={{marginBottom: '20px'}}>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {price.toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;
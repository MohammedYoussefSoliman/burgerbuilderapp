import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = ({ingredients}) => {

    let receivedIngredients = Object.keys(ingredients).map(inKey => { // ['salad', 'cheese', 'bacon', 'meat']
        return [...Array(ingredients[inKey])].map((_,i)=> { //[undifined],[undifined,undifined],[undifined],[undifined] => spread [[undifined],[undifined,undifined],[undifined],[undifined]] 
            return <BurgerIngredient key={inKey + i} type={inKey}/> // the ingredient component will be repeated with inKeys for number of corresponding indexes.
        });
    }).reduce((arr, el) => { // if the ingredients values !0 arr will equal a value like this [[],[],[],[]] else it will be []
        return arr.concat(el) // if the ingredients values !0 receivedIngredients will be like this []
    }, []) // means reducer acomulator starts with the begaining of the array
    
    if(receivedIngredients.length === 0){
        receivedIngredients = <p>Please add Ingredients</p>
    }

    return (
        <>
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
             {receivedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
            
        </>
    );
}

export default Burger;

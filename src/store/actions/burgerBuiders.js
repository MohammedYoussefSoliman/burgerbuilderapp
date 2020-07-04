import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (name) => {
    return {
        type: actionTypes.Add_ingredients,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.Remove_ingredients,
        ingredientName: name
    }
}

export const setIntialIngredients = (ingredients) => {
    return {
        type: actionTypes.Set_initialIngs,
        ingredients
    }
}
export const fetchingIngredientsFaild = ()=> {
    return {
        type: actionTypes.Fetch_initialIngs_failed
    }
}

export const fetchIntialIngredients = () => {
    return dispatch => {
            axios.get('https://react-burger-28285.firebaseio.com/ingredients.json').then(ings=>{
                dispatch(setIntialIngredients(ings.data))
        }).catch(error => {
            dispatch(fetchingIngredientsFaild())
        })
    }
}
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility'

const intialState = {
    ingredients: null,
    intialPrice: 4,
    loading: false,
    building: false,
    error: false
}


const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 0.7,
    meat: 1.5,
}

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case(actionTypes.Add_ingredients):
        // this is a custome method that could be used to update the state immutably
        const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
        const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
        const updatedState = {
            ingredients: updatedIngredients,
            intialPrice: state.intialPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
        }
            return updateObject(state, updatedState);
        case(actionTypes.Remove_ingredients):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                intialPrice: state.intialPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case(actionTypes.Set_initialIngs):
            return {
                ...state,
                ingredients: action.ingredients,
                intialPrice: 4,
                building: false,
                error: false
            }
        case(actionTypes.Fetch_initialIngs_failed): return updateObject(state, {error: true})
        default:
            return state
    }
}

export default reducer;
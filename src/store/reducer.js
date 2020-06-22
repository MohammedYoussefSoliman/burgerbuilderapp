import * as actionTypes from './actions';

const intialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    intialPrice: 4
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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                intialPrice: state.intialPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case(actionTypes.Remove_ingredients):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                intialPrice: state.intialPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state
    }
}

export default reducer;
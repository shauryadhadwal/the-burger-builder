import * as actionTypes from '../actions/actionTypes';
import constants from '../../Constants';

const initialState = {
    ingredients: null,
    totalPrice: constants.BASE_PRICE,
    error: false
}

const convertToBaseTwo = (num) => {
    return parseFloat(num.toFixed(2))
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: convertToBaseTwo(state.totalPrice + constants.INGREDIENT_PRICES[action.ingredientName])
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: convertToBaseTwo(state.totalPrice - constants.INGREDIENT_PRICES[action.ingredientName])
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: constants.BASE_PRICE,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return {
                ...state,
                error: true
            };

        default: return state;
    }
};

export default reducer;
import { GET_TOPPINGS_REQUEST, GET_TOPPINGS_SUCCESS, GET_TOPPINGS_FAILURE } from '../utils/constants';

const initialState = {
    isLoading: false,
    isError: false,
    data: []
}

const toppingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOPPINGS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_TOPPINGS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.toppings
            }
        case GET_TOPPINGS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }    
        default:
            return state;
    }
}

export default toppingsReducer;
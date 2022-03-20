import {GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE} from '../utils/constants';

const initialState = {
    isLoading: false,
    isError: false,
    data: []
};

const productsReducer = (state = initialState, action)=> {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {...state, loading: true}
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.products
            }
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: false 
            }    
        default:
            return state;
    }
}

export default productsReducer;
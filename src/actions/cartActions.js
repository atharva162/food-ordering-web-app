import {ADD_TO_CART_REQUEST, 
        ADD_TO_CART_SUCCESS, 
        ADD_TO_CART_FAILURE,
        REMOVE_FROM_CART_REQUEST,
        REMOVE_FROM_CART_SUCCESS,
        REMOVE_FROM_CART_FAILURE,
        CHANGE_PRODUCT_COUNT   
    } from '../utils/constants';

export const addToCartAction = (products) => async(dispatch)=>{
    try {
        dispatch({type: ADD_TO_CART_REQUEST});
        dispatch({type: ADD_TO_CART_SUCCESS, products: products});
    } catch (error) {
        dispatch({type: ADD_TO_CART_FAILURE});
        console.log(error);
    }
}    

export const removeFromCartAction = (id) => async(dispatch) => {
    try {
      dispatch({type: REMOVE_FROM_CART_REQUEST});
      return dispatch({type: REMOVE_FROM_CART_SUCCESS, id});  
    } catch (error) {
        console.log(error);
        return dispatch({type: REMOVE_FROM_CART_FAILURE})
    }
}

export const changeProductCountAction = (id, isIncrement) => async(dispatch) => {
    try {
        dispatch({type: CHANGE_PRODUCT_COUNT, id, isIncrement});
    } catch (error) {
        console.log('Error while changing product count');
    }
}
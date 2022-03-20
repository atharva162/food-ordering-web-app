import { 
     ADD_TO_CART_FAILURE,
     ADD_TO_CART_REQUEST,
     ADD_TO_CART_SUCCESS,
     CHANGE_PRODUCT_COUNT,
     REMOVE_FROM_CART_REQUEST,
     REMOVE_FROM_CART_SUCCESS,
     REMOVE_FROM_CART_FAILURE  } from '../utils/constants';

const initialState = {
    isLoading: false,
    isError: false,
    data: []
}

const cartReducer = (state= initialState, action) =>{
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
        case REMOVE_FROM_CART_REQUEST:    
            return {
                ...state,
                isLoading: true,
            }
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.products
            }
        case ADD_TO_CART_FAILURE:
        case REMOVE_FROM_CART_FAILURE:    
            return {
                ...state,
                isLoading: false,
                isError: true
            }  
        case CHANGE_PRODUCT_COUNT:
            return {
                ...state,
                data: state.data.map((item)=>{
                    if(item.id === action.id){
                       if(action.isIncrement){
                           console.log('Found');
                           return {
                               ...item,
                               quantity: item.quantity + 1
                           }
                       } else{
                           return{
                               ...item,
                               quantity: (item.quantity > 1 ? item.quantity - 1 : item.quantity)
                           }
                       }
                    }else{
                        return item;
                    }
                })
            }
        case REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: state.data.filter((item) => item.id !== action.id)
            }  
        default:
            return state;
    }
}

export default cartReducer;
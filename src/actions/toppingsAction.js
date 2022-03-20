import axios from 'axios';
import { GET_TOPPINGS_REQUEST, GET_TOPPINGS_SUCCESS, GET_TOPPINGS_FAILURE } from '../utils/constants';

export const getToppings = () => async(dispatch) => {
   const getToppingsData = async() => {
        try {
           // dispatch({type: GET_TOPPINGS_REQUEST});
            const {data: toppings} = await axios.get('/toppings.json');
            dispatch(loadToppingsSuccess(toppings));
        } catch (error) {
            dispatch({type: GET_TOPPINGS_FAILURE});
        }
    }
    getToppingsData();
};

export const loadToppingsSuccess = (toppings) => ({
    type: GET_TOPPINGS_SUCCESS,
    toppings
  });
  

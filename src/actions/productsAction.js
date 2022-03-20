import axios from 'axios';
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from '../utils/constants';


export const getAllProducts = (category) => async(dispatch) => {
     try {
         let result;
         dispatch({type: GET_PRODUCTS_REQUEST});
         const { data:products } = await axios.get('/products.json');
         result =  products.filter((product)=> product.categories.cat_title.toLowerCase() === category.toLowerCase()
         );
         dispatch({type: GET_PRODUCTS_SUCCESS, products: result})
     } catch (error) {
         console.log(error);
         dispatch({type: GET_PRODUCTS_FAILURE});
     }
}

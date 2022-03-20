import axios from "axios";
import { GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE } from "../utils/constants";

export const getCategories = () => async(dispatch) => {
    try {
        dispatch({type: GET_CATEGORIES_REQUEST})
        setTimeout(async()=> {
        const {data} = await axios.get('/categories.json');
        dispatch({type: GET_CATEGORIES_SUCCESS, categories: data});
        }, 2000)
    } catch (error) {
        console.log(error);
        dispatch({type: GET_CATEGORIES_FAILURE})
    }
}
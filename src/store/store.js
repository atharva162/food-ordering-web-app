import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from '../reducers/cartReducer';
import categoriesReducer from '../reducers/categoriesReducer';
import productsReducer from '../reducers/productsReducer';
import toppingsReducer from '../reducers/toppingsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    toppings: toppingsReducer,
    cart: cartReducer
}), 
composeEnhancers(applyMiddleware(thunk)));

export default store;
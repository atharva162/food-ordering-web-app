import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './components/App';
import Checkout from './components/Checkout';
import MenuItems from './components/MenuItems';
import PageNotFound from './components/PageNotFound';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

const AppRouter = () =>  (
    <BrowserRouter>
    <Switch>
       <Route component={App} path="/" exact/>
       <Route component={MenuItems} path="/menu"/>
       <Route component={Products} path="/products"/>
       <Route component={ShoppingCart} path="/cart"/>
       <Route component={Checkout} path="/checkout"/>
       <Route component={PaymentSuccessPage} path="/success"/>
       <Route component={PageNotFound} />
    </Switch>
    </BrowserRouter>
   
)
export default AppRouter;
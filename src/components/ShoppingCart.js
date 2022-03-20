import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { getFormattedPrice } from '../utils/functions';
import { getAllProducts } from '../actions/productsAction';
import { removeFromCartAction } from '../actions/cartActions';
import { CURRENCY, REMOVE_FROM_CART_SUCCESS } from '../utils/constants';
import Layout from './Layout';

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.data); 
  const products = useSelector((state)=> state.products.data);
  const isError = useSelector((state)=> state.cart.isError);
  const [cartProducts, setCartProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState(' ');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
    dispatch(getAllProducts);
  }, [])
  
  useEffect(()=>{
      if(isError){
          setErrorMsg('Something went wrong, please try again later');
      }else{
          setErrorMsg('');
      }
  }, [isError])

 useEffect(()=>{
    setCartProducts(cart);
 }, []);

 const removeItemFromCart = (id) => {
     const action = dispatch(removeFromCartAction(id));
        const filteredProducts = cartProducts.filter((item)=> item.id !== id);
        setCartProducts(filteredProducts);
 }

const checkOut = (event) => {
    event.preventDefault();
    const oosItems = [];
    cart.forEach((cartItem) => {
      const item = products.find((product)=> product.id === cartItem.id);
      if(item.quantity === 0){
        oosItems.push(item.name);
      }
    });
    if(oosItems.length === 0){
      setErrorMsg('');
      history.push('/checkout');
    }else{
      setErrorMsg(`${oosItems.join(', ')} ${
        oosItems.length > 1 ? 'are' : 'is'
      } out of stock, please remove to proceed.`)
    }
}

  return (
    <Layout cartCount={cart.length}>
      <div className='main-title'>
         Shopping Cart  
      </div>
      {cartProducts.length > 0 ? (
        <React.Fragment>
          {errorMsg !== '' && <p className='oosMsg'>{errorMsg}</p>}
          <div className='shopping-cart'>
            <ul className='cart-items'>
              {cartProducts.map(({
                id,
                title,
                quantity,
                image,
                price,
              }, index)=> {
                return (
                  <li key={index} className='cart-item'>
                    <div>
                      <img src={image} alt={title} className='cart-img'/>
                    </div>
                    <div className='p-top flex-grow-1 product-info"'>
                      <h6>{title}</h6>
                    </div>
                    <div className='p-top qty'>
                      Qty: {quantity}
                    </div>
                    <div className='p-top price'>
                      {CURRENCY} {price.toFixed(2)}
                    </div>
                    <div className='p-top'>
                      <TiDelete
                      color='#000'
                      size='25'
                      className='delete-item'
                      onClick={() => removeItemFromCart(id)}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className='cart-summary'>
              <div className='summary-header'>
                <h6>Order Summary</h6>
              </div>
              <div>
              <div>Number of items</div> 
              <div>{cartProducts.length}</div>
              </div>
              <div className='summary-total'>
                <div>Total Amount</div>
                <div>
                {getFormattedPrice(cartProducts.reduce((sum,item)=>{
                  return sum + item.price * item.quantity;
                }, 0))}
                </div>
              </div>
            <div>
              <a href='/#' onClick={checkOut} className='action-btn checkout-btn'>
                Checkout
              </a>
            </div>
            </div>
           </div>
        </React.Fragment>
      ) :(
        <div className="shopping-cart">
        <p className="no-items">Your shopping cart is currently empty.</p>
        </div>
      )}
    </Layout>
  )
}

export default ShoppingCart
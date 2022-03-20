import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Confetti from 'react-confetti';
import Layout from './Layout';
import { addToCartAction } from '../actions/cartActions';

const PaymentSuccessPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(addToCartAction([]));
    }, [])
    
  return (
    <Layout>
        <div className='order-success'>
            <div className='order-success-message'>
            <h4>Order placed successfully!</h4>
            <p>Please check your email regarding order details.</p>
            </div>
        </div>
        <Confetti />
    </Layout>
  )
}

export default PaymentSuccessPage
const express = require('express');
const crypto = require('crypto');
const Order = require('../models/order');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/payment', async(req,res)=>{
    const {cart, user, totalOrderAmount} = req.body;

    try {
        const order_id = crypto.randomBytes(15).toString('hex');

        const order = new Order({
            order_id,
            email: user.data.email,
            order: cart,
            order_total: totalOrderAmount
        });

        await order.save();

        const lineItems = cart.map((item)=>{
            const { title, price, quantity } = item;
            return{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: title
                    },
                    unit_amount: Math.ceil(price * 100)
                },
                quantity
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            client_reference_id: order_id,
            mode: 'payment',
            metadata: {
                ...user.data,
                city: user.city,
                state: user.state
            },
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/cart`
        });
        res.send({
            id: session.id
        });
    } catch (error) {
        console.log('Error', error);
        res.status(400).send('Something went wrong, try again later');
    }
})

module.exports = router;
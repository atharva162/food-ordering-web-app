const express = require('express');
const path = require('path');
const paymentRoutes = require('./routes/paymentRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.use(paymentRoutes);
app.use(express.json());
app.use(paymentRoutes);

app.get('/', (req,res)=>{
    res.send('APIs for food ordering app');
});

app.get('*', (req,res)=>{
    return res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
})
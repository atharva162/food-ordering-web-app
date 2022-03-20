const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('Database connected successfully'))
.catch((error)=> console.log(error));



const mongoose = require('mongoose');

const foodWebUserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
}
);

const FoodWebUser = mongoose.model('FoodWebUser', foodWebUserSchema);

module.exports = FoodWebUser;
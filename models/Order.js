const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true,
    },
    productId:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    amount: {
        type: Number,
        required: true,
    },
    quantity:{
        type:Number,
        required:true
    },
    fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
}, {
    timestamps: true 
});

module.exports = mongoose.model("Order", orderSchema);
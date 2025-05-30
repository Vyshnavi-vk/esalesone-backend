const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const generateUniqueId = require("../utils/generateUniuqeId")
const {sendPaymentSuccessEmail} = require("../smtp/sendPaymentSuccessEmail")
const {sendPaymentFailEmail} = require("../smtp/sendPaymentFailEmail")

const makePayment = asyncHandler(async(req, res) => {
   const { paymentMethodId, amount, product, userDetails } = req.body;

  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount:Math.round(amount * 100),
      currency:"usd",
      payment_method:paymentMethodId,
      confirm:true,
       automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      metadata:{
        fullName:userDetails.fullName, 
        email:userDetails.email, 
        phoneNumber:userDetails.phoneNumber, 
        address:userDetails.address, 
        city:userDetails.city, 
        state:userDetails.state, 
        zipCode:userDetails.zipCode,
        productId:product.id?.toString(),
        productName: product.title || '',
        description: product?.description,
        quantity: product.quantity?.toString() || '1',
        price:product?.price,
        amount:Math.round(amount * 100),
      }
    })

    const newOrder = new Order({
        orderId: generateUniqueId(),
         fullName:userDetails.fullName, 
        email:userDetails.email, 
        phoneNumber:userDetails.phoneNumber, 
        address:userDetails.address, 
        city:userDetails.city, 
        state:userDetails.state, 
        zipCode:userDetails.zipCode,
        productId:product.id?.toString(),
        productName: product.title || '',
        description: product?.description,
        quantity: product.quantity?.toString() || '1',
        price:product?.price,
        amount:Math.round(amount * 100),
    });

    await newOrder.save();

    await sendPaymentSuccessEmail(userDetails.email, newOrder);

    console.log("Order created successfully")

    res.status(200).json({ message: "Payment successful", order:newOrder});
  }catch(error) {
    console.error(error.message)
    await sendPaymentFailEmail(userDetails.email, {
      fullName: userDetails.fullName,
      email: userDetails.email,
      productTitle: product.title,
      errorMessage: error.message,
    });
    return res.status(500).json({error:"Payment failed"})
  }
})


module.exports = {makePayment}
const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")


const getOrderDetails = asyncHandler(async(req, res) => {
    const {orderId} = req.params

    if(!orderId) {
        return res.status(400).json({error:"Order Id is required"})
    }

    try{
        const order = await Order.findOne({orderId})

        if(!order) {
            return res.status(404).json({error:"Order not found"})
        }

        res.status(200).json({
            message:"Order details fetched successfully",
            order
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({error:error.message || "Internal Server Error"})
    }
})

module.exports = {getOrderDetails}
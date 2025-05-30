const router = require("express").Router()
const {getOrderDetails} = require("../controllers/orderController")

router.get("/:orderId", getOrderDetails)

module.exports = router
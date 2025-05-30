const router = require("express").Router()
const {makePayment} = require("../controllers/paymentController")

router.post("/", makePayment)

module.exports = router
require("dotenv").config()
const express = require("express")
const connectDB = require("./config/dbConnection")
const cors = require("cors")
// const {webhook} = require("./controllers/paymentController")

const app = express()
connectDB()

// app.post("/webhook", express.raw({ type: "application/json" }), webhook);
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json())


const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send(
    "API is running"
  );
});

app.use("/api/payment", require("./routes/paymentRoutes"))
app.use("/api/order", require("./routes/orderRoutes"))

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
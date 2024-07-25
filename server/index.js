const express = require("express")
const cors = require("cors")
require("colors")
require("dotenv").config()
const morgan = require("morgan")
const userRoutes = require("./routes/userRoute")
const productRoutes = require("./routes/productRoute")
const connectDB = require("./db/databse")

const app = express()

app.get("/", (req, res) => {
    res.send("<h1>Hello from Ecommerce Server</h1>")
})

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/users", userRoutes)

connectDB()

const port = process.env.PORT
const mode = process.env.MODE || "production"

app.listen(port, ()=> {
    console.log(`Server Running on ${mode} mode in http://localhost:${port}`.bgMagenta.white)
})
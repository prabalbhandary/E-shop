const express = require("express")
const {getAll, getById, add, update, deleteProduct} = require("../controller/productController")

const router = express.Router()

router.get("/all", getAll)
router.get("product/:id", getById)
router.post("/add", add)
router.put("/update/:id", update)
router.delete("/delete/:id", deleteProduct)

module.exports = router
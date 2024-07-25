const express = require("express");
const { getAll, getById, login, updateUser, deleteUser, register } = require("../controller/userController");

const router = express.Router();

router.get("/all", getAll);
router.get("/product/:id", getById);
router.post("/signup", register);
router.post("/login", login)
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;

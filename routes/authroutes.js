const express = require("express");
const { CreateUser, loginUser } = require("../controllers/authcontrollers");
const router = express.Router();
router.post("/signup", CreateUser).post("/login", loginUser);
exports.router = router;

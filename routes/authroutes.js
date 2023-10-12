const express = require("express");
const passport = require("passport");
const { CreateUser, loginUser,checkUser } = require("../controllers/authcontrollers");
const router = express.Router();

router.post('/signup', CreateUser)
.post('/login', passport.authenticate('local'), loginUser)
.get('/check',passport.authenticate('jwt'), checkUser);

exports.router = router;

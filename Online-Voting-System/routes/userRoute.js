const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {generateToken, jwtAuthMiddleware} = require("../jwt");
const { signup, login, getUserProfile, changePassword } = require('../controllers/userController');


// signup
router.post("/signup", signup)

// login
router.post("/login", login)

// Profile
router.get("/profile", jwtAuthMiddleware, getUserProfile)

// change password
router.put("/profile/password", jwtAuthMiddleware, changePassword)

module.exports = router;
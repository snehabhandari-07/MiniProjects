const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// @desc Register User
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async(req, res) => {
    let {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    let userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("Email already Registered");
    }
    // bcrypt - returns a promise
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    const user = await User.create({
        username,
        email,
        password : hashedPassword
    });

    console.log(`User : ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data not valid");
    }
});

// @desc Login User
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async(req, res) => {
    let {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!!")
    }

    const findUser = await User.findOne({email});
    // compare password with hashed password
    if(findUser && (await bcrypt.compare(password, findUser.password))){
        const accessToken = jwt.sign(
            {
                user : {
                    username : findUser.username,
                    email: findUser.email,
                    id: findUser.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            }
        )
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or Password not Valid");
    }
});

// @desc Current User Information
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
})

module.exports = {registerUser, loginUser, currentUser};


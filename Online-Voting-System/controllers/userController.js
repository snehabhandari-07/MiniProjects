const express = require('express');
const User = require('../models/user');
const {generateToken, jwtAuthMiddleware} = require("../jwt");

const signup = async(req, res) => {
    try{
        // Data is coming from req.body
        const data = req.body;
        const adminUser = await User.findOne({ role: 'admin' });

        if(data.role === "admin" && adminUser){
            return res.status(400).json({ error: 'Admin user already exists' });
        }

        const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
        }
        const newUser = new User(data); //create a newUser using User model

        // Save the data in document
        const response = await newUser.save();
        console.log(response);

        // Payload to generate token using jwt
        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload));

        // pass payload to function
        const token = generateToken(payload);
        console.log("Token is ",token);

        // Send the json response
        res.status(200).json({response: response, token : token});

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
}

const login = async (req, res) => {
    try{
        // Extract user info from req.body
        const {aadharCardNumber, password} = req.body;

        // find user using aadharCardNumber
        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        // Error if no user found or password does not match
        if(!user || ! (await user.comparePassword(password))){
            return res.status(401).json({error: "Invalid aadharCardNumber or password"});
        }

        const payload = {
            id: user.id
        }

        const token = generateToken(payload);
        console.log("Token generated : ", token);

        res.json({token: token});

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
}

const getUserProfile = async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;

        const user = await User.findById(userId);

        res.status(200).json({user});
    
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
}

const changePassword = async(req, res) => {
    try{
        const userId = req.user.id;
        const {oldPassword, newPassword} = req.body;

        const userData = await User.findById(userId);

        if(!await userData.comparePassword(oldPassword)){
            return res.status(400).json({ error: "Old password is incorrect" });
        }

        userData.password = newPassword;
        await userData.save();

        res.status(200).json({ message: "Password updated successfully" });
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
}

module.exports = {signup, login, getUserProfile, changePassword}
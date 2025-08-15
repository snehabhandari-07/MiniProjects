const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    aadharCardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});

// Hash the password before saving password in db
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        next(err);
    }
})

userSchema.methods.comparePassword = async (pass) => {
    try{
        const isMatch = await bcrypt.compare(pass, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
};


const User = new mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = new mongoose.Schema({
    // type: {
    //     type: String,
    // },
    // entity_type: {
    //     type: String,
    //     enum: ["owner", "upper_management", "lower_management", "employee"],
    // },
    fullname: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    position: {
        type: String,
        enum: ["Manager", "Analyst", "Associate"],
    },
    department: {
        type: String,
        enum: ["Finance", "Sales", "Operations"],
    },
    refreshToken: {
        type: String,
    }
    // phone: {
    //     type: String,
    // },
    // address: {
    //     type: String,
    // },
});

// // hash the password
userModel.pre("save", async function(next){
    // check if the password is modified
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})
// // check the password
userModel.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userModel.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRY
        }
    )
}
userModel.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRY
        }
    )
}

const User = mongoose.model("User", userModel);
module.exports = User;
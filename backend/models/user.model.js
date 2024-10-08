const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

// User schema definition
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
    },
    department_id: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: 'active',
    },
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Instance method to check if the password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Instance method to generate an access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRY,
        }
    );
}

// Instance method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRY,
        }
    );
}

// Export the User model
const User = model("User", userSchema);
module.exports = User;

const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const credentials = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select(
            "-password -refreshToken"
        )
        const position = user.position;
        const department = user.department;

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200, 
                {
                "position": position,
                "department": department
                },
                "success"
            )
        )
    } catch (error) {
        throw new ApiError(401, "User not found")
    }
})

module.exports = {
    credentials
}
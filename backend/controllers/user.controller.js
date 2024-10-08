const User = require('../models/user.model.js');
const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
// const cookieParser = require("cookie-parser");

const generateAccessTokenAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = await user.generateAccessToken();
		const refreshToken = await user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(501, "something went wrong while generating the access token and refresh token")
	}
}

exports.userLogin = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body;
		const foundUser = await User.findOne({ email });

		if (!foundUser) {
			throw new ApiError(404, "User does not exist")
		}

		const isPasswordCorrect = foundUser.isPasswordCorrect(password)
		if (!isPasswordCorrect) {
			throw new ApiError(404, "Invalid Password")
		}

		const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(foundUser._id)

		const loggedInUser = await User.findById(foundUser._id).select(
			"-password -refreshToken"
		)

		const options = {
			httpOnly: true,
			secure: true,
		}

		return res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", refreshToken, options)
			.json(
				new ApiResponse(200, foundUser, "Success")
			)
	} catch (error) {
		throw new ApiError(404, "User not found");
	}
})

exports.userLogout = asyncHandler(async (req, res) => {
	try {
		await User.findByIdAndUpdate(
			req.user._id,
			{
				$set: {
					refreshToken: undefined
				}
			},
			{
				new: true
			}
		)

		const options = {
			httpOnly: true,
			secure: true,
		}

		return res
			.status(200)
			.clearCookie("accessToken", options)
			.clearCookie("refreshToken", options)
			.json(
				new ApiResponse(200, {}, "User logged out")
			)


	} catch (error) {
		throw new ApiError(401, 'User not found')
	}
})

// Get all users
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get user by ID
exports.getUserById = async (req, res) => {
	try {
		const user = await User.find({ id: req.params.id });
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Create new user
exports.createUser = async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update user
exports.updateUser = async (req, res) => {
	try {
		const updated = await User.update(req.body, {
			where: { user_id: req.params.id },
		});
		if (updated) {
			const updatedUser = await User.findByPk(req.params.id);
			res.json(updatedUser);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete user
exports.deleteUser = async (req, res) => {
	try {
		const rowsDeleted = await User.destroy({ where: { user_id: req.params.id } });
		if (rowsDeleted) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

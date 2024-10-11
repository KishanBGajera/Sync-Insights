const User = require('../models/user.model.js');
const Role = require('../models/role.model.js');
const Department = require('../models/department.model.js');

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
		const user_id = req.body;
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

// Get all users of the department
exports.getAllUsersOfDepartment = async (req, res) => {
	try {
		const users = await User.find({ department_id: req.body.department_id });
		if (users) {
			res.json(users);
		} else {
			res.status(404).json({ message: 'Users not found'});
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

// Create new user
exports.createUser = async (req, res) => {
	try {
		const { username, password, first_name, last_name, role_id, department_id, email, status } = req.body;
		// const roleDocument = await Role.findOne({ role_name: role });
		// const departmentDocument = department ? await Department.findOne({ department_name: department }) : null;
		const newUser = await User.create({
			username: username,
			password: password,
			first_name: first_name,
			last_name: last_name,
			role_id: role_id,
			department_id: department_id,
			email: email,
			status: status,
		});
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update user
exports.updateUser = async (req, res) => {
	try {
		const { user_id, username, password, first_name, last_name, role, department, email, status } = req.body;

		const roleDocument = await Role.findOne({role_name: role});
		const departmentDocument = await Department.findOne({department_name: department});

		const updateStatus = await User.updateOne({ _id: user_id }, {
			username: username,
			password: password,
			first_name: first_name,
			last_name: last_name,
			role_id: roleDocument._id,
			department_id: departmentDocument._id,
			email: email,
			status: status,
		});
		res.json({ updateStatus });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete user
exports.deleteUser = async (req, res) => {
	try {
		const { user_id } = req.body;
		const status = await User.deleteOne({ _id: user_id });
		res.json({ status });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

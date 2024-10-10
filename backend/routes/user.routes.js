const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { userLogin, userLogout } = require("../controllers/user.controller");

// GET all users
router.get('/all', userController.getAllUsers);

// GET a user by ID
router.get('/user', userController.getUserById);

// GET all users of the department
router.get('/all/department', userController.getAllUsersOfDepartment); 

// POST a new user
router.post('/create', userController.createUser);

// PUT to update an existing user
router.put('/update', userController.updateUser);

// DELETE a user
router.delete('/delete', userController.deleteUser);

router.post("/login", userLogin);

router.post("/logout", userLogout);
// router.post("/credentials", credentials);

module.exports = router;

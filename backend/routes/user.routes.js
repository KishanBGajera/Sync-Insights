const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { userLogin, userLogout } = require("../controllers/user.controller");

// GET all users
router.get('/all', userController.getAllUsers);

// GET a user by ID
router.get('/:id', userController.getUserById);

// POST a new user
router.post('/create', userController.createUser);

// PUT to update an existing user
router.put('/:id', userController.updateUser);

// DELETE a user
router.delete('/:id', userController.deleteUser);

router.post("/login", userLogin);

router.post("/logout", userLogout);
// router.post("/credentials", credentials);

module.exports = router;

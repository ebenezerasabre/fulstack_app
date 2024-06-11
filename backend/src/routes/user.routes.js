const express = require('express');
const userController = require('../controllers/user.contoller');

const router = express.Router();

//router.post('/m', userController.createUser);

// Define route to create user
router.post('/', userController.createUser);

// Define route to create multiple users at a time
router.post('/bulk', userController.createMultipleUsers);

// Define the route to count all users
router.get('/count', userController.countUsers);

// Define route to get a single user by ID
router.get('/:id', userController.getUserById);

// Define route to find all users
router.get('/', userController.getAllUsers);

// Define route to update a single user by ID
router.put('/:id', userController.updateUser);

// Define the route to update multiple users
router.put('/', userController.updateUsers);



// Define the route to delete a user by ID
router.delete('/:id', userController.deleteUser);



module.exports = router;

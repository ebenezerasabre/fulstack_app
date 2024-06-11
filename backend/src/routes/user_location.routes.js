const express = require('express');
const userLocationController = require('../controllers/user_location.controller');
const router = express.Router();

router.get('/', userLocationController.getAllUserLocations);
router.get('/:id', userLocationController.getUserLocationById);
router.post('/bulk', userLocationController.createMultipleUserLocations);
router.post('/', userLocationController.createUserLocation);
router.put('/:id', userLocationController.updateUserLocation);
router.delete('/:id', userLocationController.deleteUserLocation);

module.exports = router;

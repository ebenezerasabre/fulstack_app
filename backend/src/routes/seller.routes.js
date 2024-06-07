const express = require('express');
const sellerController = require('../controllers/seller.controller');

const router = express.Router();

// Define the route to get all sellers
router.get('/', sellerController.getAllSellers);

// Define route to get a single seller by ID
router.get('/:id', sellerController.getSellerById);

// Define the route to create a new seller
router.post('/', sellerController.createSeller);

// Define the route to update a seller by ID
router.put('/:id', sellerController.updateSeller);

// Define the route to delete a seller by ID
router.delete('/:id', sellerController.deleteSeller);

module.exports = router;
``
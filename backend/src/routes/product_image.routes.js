const express = require('express');
const productImageController = require('../controllers/product_image.controller');
const router = express.Router();

router.get('/', productImageController.getAllProductImages);
router.get('/:id', productImageController.getProductImageById);
router.post('/', productImageController.createProductImage);
router.post('/bulk', productImageController.createMultipleProductImages); // Route for creating multiple product images
router.put('/:id', productImageController.updateProductImage);
router.delete('/:id', productImageController.deleteProductImage);

module.exports = router;

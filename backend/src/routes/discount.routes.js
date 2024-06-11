const express = require('express');
const discountController = require('../controllers/discount.controller');
const router = express.Router();

router.get('/', discountController.getAllDiscounts);
router.get('/:id', discountController.getDiscountById);
router.post('/', discountController.createDiscount);
router.post('/bulk', discountController.createMultipleDiscounts);
router.put('/:id', discountController.updateDiscount);
router.delete('/:id', discountController.deleteDiscount);

module.exports = router;

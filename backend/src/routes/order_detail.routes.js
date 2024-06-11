const express = require('express');
const orderDetailController = require('../controllers/order_detail.controller');
const router = express.Router();

router.get('/', orderDetailController.getAllOrderDetails);
router.get('/:id', orderDetailController.getOrderDetailById);
router.post('/', orderDetailController.createOrderDetail);
router.post('/bulk', orderDetailController.createMultipleOrderDetails);
router.put('/:id', orderDetailController.updateOrderDetail);
router.delete('/:id', orderDetailController.deleteOrderDetail);

module.exports = router;

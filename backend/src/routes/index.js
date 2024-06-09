const express = require('express');
const userRoutes = require('./user.routes');
const sellerRoutes = require('./seller.routes');
const categoryRoutes = require('./category.routes');
const userLocation = require('./user_location.routes');
const productRoutes = require('./product.routes');
const discountRoutes = require('./discount.routes');
const orderRoutes = require('./order.routes');
const orderDetailRoutes = require('./order_detail.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/sellers', sellerRoutes);
router.use('/categories', categoryRoutes);
router.use('/location', userLocation);
router.use('/products', productRoutes);
router.use('/discounts', discountRoutes);
router.use('/orders', orderRoutes);
router.use('/orderDetails', orderDetailRoutes);




module.exports = router;
//curl -X POST -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' http://localhost:4000/api/users

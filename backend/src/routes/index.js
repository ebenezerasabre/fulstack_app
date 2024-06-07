const express = require('express');
const userRoutes = require('./user.routes');
const sellerRoutes = require('./seller.routes');
const categoryRoutes = require('./category.routes');
const userLocation = require('./user_location.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/sellers', sellerRoutes);
router.use('/categories', categoryRoutes);
router.use('/location', userLocation);

module.exports = router;
//curl -X POST -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' http://localhost:4000/api/users

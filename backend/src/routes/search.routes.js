const express = require('express');
const searchController = require('../controllers/search.controller');
const router = express.Router();



router.get('/dp', searchController.getDiscountedProducts);

router.get('/dps', searchController.getDiscountedProducts_search);

router.get('/cp', searchController.getClosestProducts);

router.get('/cps', searchController.getClosestProducts_search);

router.get('/dcp', searchController.getDiscountedClosestProducts);

router.get('/dcps', searchController.getDiscountedClosestProducts_search);

module.exports = router;




/*

 getDiscountedProducts,
    getDiscountedProducts_search,
    getClosestProducts,
    getClosestProducts_search,
    getDiscountedClosestProducts,
    getDiscountedClosestProducts_search


*/
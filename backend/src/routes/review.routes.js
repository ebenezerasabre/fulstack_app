const express = require('express');
const reviewController = require('../controllers/review.contoller');
const router = express.Router();


router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.post('/', reviewController.createReview);
router.post('/bulk', reviewController.createMultipleReviews); // Route for multiple reviews
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;

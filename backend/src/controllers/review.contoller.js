const reviewService = require('../services/review.service');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const newReview = await reviewService.createReview(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMultipleReviews = async (req, res) => {
  try {
    const newReviews = await reviewService.createMultipleReviews(req.body);
    res.status(201).json(newReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await reviewService.updateReview(req.params.id, req.body);
    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await reviewService.deleteReview(req.params.id);
    if (deletedReview) {
      res.status(200).json(deletedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

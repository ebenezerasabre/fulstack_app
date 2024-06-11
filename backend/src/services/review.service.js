const reviewModel = require('../models/review.model');

exports.getAllReviews = async () => {
  try {
    return await reviewModel.getAllReviews();
  } catch (err) {
    throw new Error(err);
  }
};

exports.getReviewById = async (id) => {
  try {
    return await reviewModel.getReviewById(id);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createReview = async (reviewData) => {
  try {
    return await reviewModel.createReview(reviewData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createMultipleReviews = async (reviewsData) => {
  try {
    return await reviewModel.createMultipleReviews(reviewsData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateReview = async (id, reviewData) => {
  try {
    return await reviewModel.updateReview(id, reviewData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteReview = async (id) => {
  try {
    return await reviewModel.deleteReview(id);
  } catch (err) {
    throw new Error(err);
  }
};

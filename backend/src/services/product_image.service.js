const productImageModel = require('../models/product_image.model');

exports.getAllProductImages = async () => {
  try {
    return await productImageModel.getAllProductImages();
  } catch (err) {
    throw new Error(err);
  }
};

exports.getProductImageById = async (id) => {
  try {
    return await productImageModel.getProductImageById(id);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createProductImage = async (imageData) => {
  try {
    return await productImageModel.createProductImage(imageData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createMultipleProductImages = async (imagesData) => {
  try {
    return await productImageModel.createMultipleProductImages(imagesData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateProductImage = async (id, imageData) => {
  try {
    return await productImageModel.updateProductImage(id, imageData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteProductImage = async (id) => {
  try {
    return await productImageModel.deleteProductImage(id);
  } catch (err) {
    throw new Error(err);
  }
};

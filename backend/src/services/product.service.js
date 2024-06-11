const productModel = require('../models/product.model');

exports.getAllProducts = async () => {
  try {
    return await productModel.getAllProducts();
  } catch (err) {
    throw new Error(err);
  }
};

exports.searchProducts = async (searchWord) => {
    try {
      return await productModel.searchProducts(searchWord);
    } catch (err) {
      throw new Error(err);
    }
  };

exports.getProductById = async (id) => {
  try {
    return await productModel.getProductById(id);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createProduct = async (productData) => {
  try {
    return await productModel.createProduct(productData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createMultipleProducts = async (productsData) => {
    try {
      return await productModel.createMultipleProducts(productsData);
    } catch (err) {
      throw new Error(err);
    }
  };

exports.updateProduct = async (id, productData) => {
  try {
    return await productModel.updateProduct(id, productData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteProduct = async (id) => {
  try {
    return await productModel.deleteProduct(id);
  } catch (err) {
    throw new Error(err);
  }
};

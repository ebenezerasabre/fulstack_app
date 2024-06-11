const productImageService = require('../services/product_image.service');

exports.getAllProductImages = async (req, res) => {
  try {
    const productImages = await productImageService.getAllProductImages();
    res.status(200).json(productImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductImageById = async (req, res) => {
  try {
    const productImage = await productImageService.getProductImageById(req.params.id);
    if (productImage) {
      res.status(200).json(productImage);
    } else {
      res.status(404).json({ message: 'Product image not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProductImage = async (req, res) => {
  try {
    const newProductImage = await productImageService.createProductImage(req.body);
    res.status(201).json(newProductImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMultipleProductImages = async (req, res) => {
  try {
    const newProductImages = await productImageService.createMultipleProductImages(req.body);
    res.status(201).json(newProductImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProductImage = async (req, res) => {
  try {
    const updatedProductImage = await productImageService.updateProductImage(req.params.id, req.body);
    if (updatedProductImage) {
      res.status(200).json(updatedProductImage);
    } else {
      res.status(404).json({ message: 'Product image not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const deletedProductImage = await productImageService.deleteProductImage(req.params.id);
    if (deletedProductImage) {
      res.status(200).json(deletedProductImage);
    } else {
      res.status(404).json({ message: 'Product image not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sellerModel = require('../models/seller.model');

// Get all sellers
exports.getAllSellers = async () => {
  try {
    return await sellerModel.getAllSellers();
  } catch (err) {
    throw new Error(err);
  }
};

// Get seller by ID
exports.getSellerById = async (id) => {
    try {
      return await sellerModel.getSellerById(id);
    } catch (err) {
      throw new Error(err);
    }
  };


  // Get nearby sellers
  exports.getNearBySellers = async (userId, radius) => {
    try {
        return await sellerModel.getNearBySellers(userId, radius);
    } catch (err){
        throw new Error(err);
    }
  }


// Create a new seller
exports.createSeller = async (sellerData) => {
  try {
    return await sellerModel.createSeller(sellerData);
  } catch (err) {
    throw new Error(err);
  }
};

// Update a single seller by ID
exports.updateSeller = async (id, sellerData) => {
  try {
    return await sellerModel.updateSeller(id, sellerData);
  } catch (err) {
    throw new Error(err);
  }
};

// Delete a seller by ID
exports.deleteSeller = async (id) => {
  try {
    return await sellerModel.deleteSeller(id);
  } catch (err) {
    throw new Error(err);
  }
};

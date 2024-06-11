const sellerService = require('../services/seller.service');

// Get all sellers
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await sellerService.getAllSellers();
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get seller by ID
exports.getSellerById = async (req, res) => {
    try {
      const seller = await sellerService.getSellerById(req.params.id);
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
      res.status(200).json(seller);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Get nearby sellers
exports.getNearBySellers = async (req, res) => {
    try {
        const sellers = await sellerService.getNearBySellers(req.query.userId, req.query.radius);
        if(!sellers) {
            return res.status(404).json({ message: 'Sellers not found' });
        }
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  

// Create a new seller
exports.createSeller = async (req, res) => {
  try {
    const seller = await sellerService.createSeller(req.body);
    res.status(201).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMultipleSellers = async (req, res) => {
  try {
    const newSellers = await sellerService.createMultipleSellers(req.body);
    res.status(201).json(newSellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a single seller
exports.updateSeller = async (req, res) => {
  try {
    const seller = await sellerService.updateSeller(req.params.id, req.body);
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a seller
exports.deleteSeller = async (req, res) => {
  try {
    const seller = await sellerService.deleteSeller(req.params.id);
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const discountService = require('../services/discount.service');

exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await discountService.getAllDiscounts();
    res.status(200).json(discounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDiscountById = async (req, res) => {
  try {
    const discount = await discountService.getDiscountById(req.params.id);
    if (discount) {
      res.status(200).json(discount);
    } else {
      res.status(404).json({ message: 'Discount not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDiscount = async (req, res) => {
  try {
    const newDiscount = await discountService.createDiscount(req.body);
    res.status(201).json(newDiscount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const updatedDiscount = await discountService.updateDiscount(req.params.id, req.body);
    if (updatedDiscount) {
      res.status(200).json(updatedDiscount);
    } else {
      res.status(404).json({ message: 'Discount not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteDiscount = async (req, res) => {
  try {
    const deletedDiscount = await discountService.deleteDiscount(req.params.id);
    if (deletedDiscount) {
      res.status(200).json(deletedDiscount);
    } else {
      res.status(404).json({ message: 'Discount not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

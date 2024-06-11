const discountModel = require('../models/discount.model');

exports.getAllDiscounts = async () => {
  try {
    return await discountModel.getAllDiscounts();
  } catch (err) {
    throw new Error(err);
  }
};

exports.getDiscountById = async (id) => {
  try {
    return await discountModel.getDiscountById(id);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createDiscount = async (discountData) => {
  try {
    return await discountModel.createDiscount(discountData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createMultipleDiscounts = async (discountsData) => {
    try {
      return await discountModel.createMultipleDiscounts(discountsData);
    } catch (err) {
      throw new Error(err);
    }
  };

exports.updateDiscount = async (id, discountData) => {
  try {
    return await discountModel.updateDiscount(id, discountData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteDiscount = async (id) => {
  try {
    return await discountModel.deleteDiscount(id);
  } catch (err) {
    throw new Error(err);
  }
};

const categoryModel = require('../models/category.model');

// Get all categories
exports.getAllCategories = async () => {
  try {
    return await categoryModel.getAllCategories();
  } catch (err) {
    throw new Error(err);
  }
};

// Get category by ID
exports.getCategoryById = async (id) => {
    try {
      return await categoryModel.getCategoryById(id);
    } catch (err) {
      throw new Error(err);
    }
  };

// Create a new category
exports.createCategory = async (categoryData) => {
  try {
    return await categoryModel.createCategory(categoryData);
  } catch (err) {
    throw new Error(err);
  }
};



// Update a single category by ID
exports.updateCategory = async (id, categoryData) => {
  try {
    return await categoryModel.updateCategory(id, categoryData);
  } catch (err) {
    throw new Error(err);
  }
};

// Delete a category by ID
exports.deleteCategory = async (id) => {
  try {
    return await categoryModel.deleteCategory(id);
  } catch (err) {
    throw new Error(err);
  }
};

const express = require('express');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

// Define the route to get all categories
router.get('/', categoryController.getAllCategories);

// Define route to get a single category by ID
router.get('/:id', categoryController.getCategoryById);

// Define the route to create a new category
router.post('/', categoryController.createCategory);

// create multiple categories
router.post('/bulk', categoryController.createMultipleCategories);


// Define the route to update a category by ID
router.put('/:id', categoryController.updateCategory);

// Define the route to delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;

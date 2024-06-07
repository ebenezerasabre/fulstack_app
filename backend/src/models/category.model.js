const pool = require('./db');


const createCategoryTable = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS categories (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(50) NOT NULL,
        description TEXT
      );
    `;
    await pool.query(query);
  };
  
  createCategoryTable();



// Get all categories
const getAllCategories = async () => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

// Get categories by ID
const getCategoryById = async (id) => {
    try {
      const result = await pool.query('SELECT * FROM categories WHERE category_id = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  };
  

// Create a new category
const createCategory = async (categoryData) => {
  try {
    const query = `
      INSERT INTO categories (category_name, description)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [categoryData.category_name, categoryData.description];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

// Update a single category by ID
const updateCategory = async (id, categoryData) => {
  try {
    const query = `
      UPDATE categories SET
        category_name = $1
      WHERE category_id = $2
      RETURNING *;
    `;
    const values = [categoryData.category_name, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

// Delete a category by ID
const deleteCategory = async (id) => {
  try {
    const query = 'DELETE FROM categories WHERE category_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};

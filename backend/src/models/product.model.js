const pool = require('./db');

const createProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      product_id SERIAL PRIMARY KEY,
      seller_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      product_description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      quantity_available INTEGER NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (seller_id) REFERENCES sellers(seller_id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(category_id)
    );
  `;
  await pool.query(query);
};

createProductTable();

const getAllProducts = async () => {
  try {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const searchProducts = async (searchWord) => {
    console.log("search Products: " + searchWord);
    try {
        //const query = `SELECT * FROM products where product_name ILIKE $1 OR product_description ILIKE $2`;
        const query = `
            SELECT * FROM products
            WHERE 
                to_tsvector('english', product_name || ' ' || coalesce(product_description, '')) @@ to_tsquery('english', $1)
                OR product_name ILIKE $2
                OR similarity(product_name, $3) > 0.3
            ORDER BY
                similarity(product_name, $3) DESC
            LIMIT 10;
      `;
      const searchTerm = `%${searchWord}%`;

      const result = await pool.query(query, [searchWord, searchTerm, searchWord]);
      //const result = await pool.query(query, [searchTerm, searchTerm]);
      return result.rows;
    } catch (err) {
      throw new Error(err);
    }
  };

const getProductById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createProduct = async (productData) => {
  try {
    const query = `
      INSERT INTO products (seller_id, category_id, product_name, product_description, price, quantity_available)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      productData.seller_id,
      productData.category_id,
      productData.product_name,
      productData.product_description,
      productData.price,
      productData.quantity_available
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const updateProduct = async (id, productData) => {
  try {
    const query = `
      UPDATE products SET
        seller_id = $1,
        category_id = $2,
        product_name = $3,
        product_description = $4,
        price = $5,
        quantity_available = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE product_id = $7
      RETURNING *;
    `;
    const values = [
      productData.seller_id,
      productData.category_id,
      productData.product_name,
      productData.product_description,
      productData.price,
      productData.quantity_available,
      id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const deleteProduct = async (id) => {
  try {
    const query = 'DELETE FROM products WHERE product_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllProducts,
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

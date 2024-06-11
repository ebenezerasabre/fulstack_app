const pool = require('./db');

const createProductImagesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS product_images (
      image_id SERIAL PRIMARY KEY,
      product_id INT NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
    );
  `;
  await pool.query(query);
};

createProductImagesTable();

const getAllProductImages = async () => {
  try {
    const result = await pool.query('SELECT * FROM product_images');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const getProductImageById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM product_images WHERE image_id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createProductImage = async (imageData) => {
  try {
    const query = `
      INSERT INTO product_images (product_id, image_url)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [imageData.product_id, imageData.image_url];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createMultipleProductImages = async (imagesData) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const query = `
      INSERT INTO product_images (product_id, image_url)
      VALUES 
      ${imagesData.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ')}
      RETURNING *;
    `;
    const values = imagesData.flatMap(image => [image.product_id, image.image_url]);
    const result = await client.query(query, values);
    await client.query('COMMIT');
    return result.rows;
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error(err);
  } finally {
    client.release();
  }
};

const updateProductImage = async (id, imageData) => {
  try {
    const query = `
      UPDATE product_images SET
        product_id = $1,
        image_url = $2
      WHERE image_id = $3
      RETURNING *;
    `;
    const values = [imageData.product_id, imageData.image_url, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const deleteProductImage = async (id) => {
  try {
    const query = 'DELETE FROM product_images WHERE image_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllProductImages,
  getProductImageById,
  createProductImage,
  createMultipleProductImages,
  updateProductImage,
  deleteProductImage,
};

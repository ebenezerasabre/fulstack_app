const pool = require('./db');

const createReviewTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS reviews (
      review_id SERIAL PRIMARY KEY,
      product_id INTEGER NOT NULL,
      customer_id INTEGER NOT NULL,
      review_text TEXT,
      rating INTEGER CHECK (rating BETWEEN 1 AND 5),
      review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
      FOREIGN KEY (customer_id) REFERENCES users(user_id)
    );
  `;
  await pool.query(query);
};

createReviewTable();

const getAllReviews = async () => {
  try {
    const result = await pool.query('SELECT * FROM reviews');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const getReviewById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM reviews WHERE review_id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createReview = async (reviewData) => {
  try {
    const query = `
      INSERT INTO reviews (product_id, customer_id, review_text, rating)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      reviewData.product_id,
      reviewData.customer_id,
      reviewData.review_text,
      reviewData.rating
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createMultipleReviews = async (reviewsData) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
        INSERT INTO reviews (product_id, customer_id, review_text, rating)
        VALUES 
        ${reviewsData.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(', ')}
        RETURNING *;
      `;
      const values = reviewsData.flatMap(review => [
        review.product_id,
        review.customer_id,
        review.review_text,
        review.rating
      ]);
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


const updateReview = async (id, reviewData) => {
  try {
    const query = `
      UPDATE reviews SET
        product_id = $1,
        customer_id = $2,
        review_text = $3,
        rating = $4
      WHERE review_id = $5
      RETURNING *;
    `;
    const values = [
      reviewData.product_id,
      reviewData.customer_id,
      reviewData.review_text,
      reviewData.rating,
      id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const deleteReview = async (id) => {
  try {
    const query = 'DELETE FROM reviews WHERE review_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  createMultipleReviews,
  updateReview,
  deleteReview
};

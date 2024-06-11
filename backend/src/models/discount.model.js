const pool = require('./db');

const createDiscountTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS discounts (
      discount_id SERIAL PRIMARY KEY,
      product_id INTEGER NOT NULL,
      discount_percentage NUMERIC(5, 2) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
    );
  `;
  await pool.query(query);
};

createDiscountTable();

const getAllDiscounts = async () => {
  try {
    const result = await pool.query('SELECT * FROM discounts');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const getDiscountById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM discounts WHERE discount_id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createDiscount = async (discountData) => {
  try {
    const query = `
      INSERT INTO discounts (product_id, discount_percentage, start_date, end_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      discountData.product_id,
      discountData.discount_percentage,
      discountData.start_date,
      discountData.end_date
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createMultipleDiscounts = async (discountsData) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
        INSERT INTO discounts (product_id, discount_percentage, start_date, end_date)
        VALUES 
        ${discountsData.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(', ')}
        RETURNING *;
      `;
      const values = discountsData.flatMap(discount => [
        discount.product_id,
        discount.discount_percentage,
        discount.start_date,
        discount.end_date
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

const updateDiscount = async (id, discountData) => {
  try {
    const query = `
      UPDATE discounts SET
        product_id = $1,
        discount_percentage = $2,
        start_date = $3,
        end_date = $4
      WHERE discount_id = $5
      RETURNING *;
    `;
    const values = [
      discountData.product_id,
      discountData.discount_percentage,
      discountData.start_date,
      discountData.end_date,
      id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const deleteDiscount = async (id) => {
  try {
    const query = 'DELETE FROM discounts WHERE discount_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  createMultipleDiscounts,
  updateDiscount,
  deleteDiscount
};

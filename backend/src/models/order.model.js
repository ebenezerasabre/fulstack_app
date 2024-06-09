const pool = require('./db');

const createOrderTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS orders (
      order_id SERIAL PRIMARY KEY,
      customer_id INTEGER NOT NULL,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
  `;
  await pool.query(query);
};

createOrderTable();

const getAllOrders = async () => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const getOrderById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE order_id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createOrder = async (orderData) => {
  try {
    const query = `
      INSERT INTO orders (customer_id)
      VALUES ($1)
      RETURNING *;
    `;
    const values = [orderData.customer_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const updateOrder = async (id, orderData) => {
  try {
    const query = `
      UPDATE orders SET
        customer_id = $1,
        order_date = $2
      WHERE order_id = $3
      RETURNING *;
    `;
    const values = [
      orderData.customer_id,
      orderData.order_date,
      id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const deleteOrder = async (id) => {
  try {
    const query = 'DELETE FROM orders WHERE order_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};

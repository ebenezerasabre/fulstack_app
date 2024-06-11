const pool = require('./db');

const createOrderDetailTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS order_details (
      order_detail_id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
  `;
  await pool.query(query);
};

createOrderDetailTable();

const getAllOrderDetails = async () => {
  try {
    const result = await pool.query('SELECT * FROM order_details');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const getOrderDetailById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM order_details WHERE order_detail_id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createOrderDetail = async (orderDetailData) => {
  try {
    const query = `
      INSERT INTO order_details (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      orderDetailData.order_id,
      orderDetailData.product_id,
      orderDetailData.quantity,
      orderDetailData.price
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createMultipleOrderDetails = async (orderDetailsData) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
        INSERT INTO order_details (order_id, product_id, quantity, price)
        VALUES 
        ${orderDetailsData.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(', ')}
        RETURNING *;
      `;
      const values = orderDetailsData.flatMap(detail => [
        detail.order_id,
        detail.product_id,
        detail.quantity,
        detail.price
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

const updateOrderDetail = async (id, orderDetailData) => {
  try {
    const query = `
      UPDATE order_details SET
        order_id = $1,
        product_id = $2,
        quantity = $3,
        price = $4
      WHERE order_detail_id = $5
      RETURNING *;
    `;
    const values = [
      orderDetailData.order_id,
      orderDetailData.product_id,
      orderDetailData.quantity,
      orderDetailData.price,
      id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const deleteOrderDetail = async (id) => {
  try {
    const query = 'DELETE FROM order_details WHERE order_detail_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  createMultipleOrderDetails,
  updateOrderDetail,
  deleteOrderDetail
};

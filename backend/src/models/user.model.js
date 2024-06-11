const pool = require('./db');

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(100) UNIQUE NOT NULL,
      is_seller BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

createUserTable();

const getAllUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const getUserById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const countUsers = async () => {
  try {
    const result = await pool.query('SELECT count(*) FROM users');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};


const createUser = async (userData) => {
  try {
    const query = `
      INSERT INTO users (username, email, phone, is_seller)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [userData.username, userData.email, userData.phone, userData.is_seller];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createMultipleUsers = async (usersData) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const query = `
      INSERT INTO users (username, email, phone, is_seller)
      VALUES 
      ${usersData.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(', ')}
      RETURNING *;
    `;
    const values = usersData.flatMap(user => [
      user.username,
      user.email,
      user.phone,
      user.address,
      user.is_seller
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



const updateUser = async (id, userData) => {
  try {
    const query = `
      UPDATE users SET
        username = $1,
        email = $2,
        phone = $3,
        is_seller = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $5
      RETURNING *;
    `;
    const values = [userData.username, userData.email, userData.phone, userData.is_seller, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};



// Update multiple users
const updateUsers = async (users) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const user of users) {
      const query = `
        UPDATE users SET
          username = $1,
          email = $2,
          is_seller = $3,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $4;
      `;
      const values = [user.username, user.email, user.is_seller, user.user_id];
      await client.query(query, values);
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error(err);
  } finally {
    client.release();
  }
};

const deleteUser = async (id) => {
  try {
    const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  countUsers,
  createUser,
  createMultipleUsers,
  updateUser,
  updateUsers,
  deleteUser
};

const pool = require('./db');

const createAuth = async (authData) => {
  const query = `
    INSERT INTO auth (user_id, password_hash, last_login)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [authData.user_id, authData.password_hash, authData.last_login];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAuthByUserId = async (user_id) => {
  const query = `SELECT * FROM auth WHERE user_id = $1`;
  const values = [user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createAuth,
  getAuthByUserId
};

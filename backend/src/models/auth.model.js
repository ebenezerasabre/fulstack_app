const pool = require('./db');

const createAuthTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS auth (
            auth_id SERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE NOT NULL,
            password_hash VARCHAR(100) NOT NULL,
            last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `;
    await pool.query(query);
};

createAuthTable();




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

const updateAuth = async (user_id) => {
    try {
        const query = `
            UPDATE auth SET last_login = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *;
        `;
        const values = [user_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        throw new Error(err);
    }
};

module.exports = {
  createAuth,
  getAuthByUserId
};

const pool = require('./db');

const createSellerTable = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS sellers (
        seller_id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        store_name VARCHAR(100) NOT NULL,
        store_description TEXT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `;
    await pool.query(query);
  };

  createSellerTable();


// Get all sellers
const getAllSellers = async () => {
  try {
    const result = await pool.query('SELECT * FROM sellers');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

// Get seller by ID
const getSellerById = async (id) => {
    try {
      const result = await pool.query('SELECT * FROM sellers WHERE seller_id = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  };


const getNearBySellers = async (userId, data) => {
    const userLocationQuery = `SELECT location from user_location WHERE user_id = $1`;
    try {
      // Get user's location
      const { rows } = await pool.query(userLocationQuery, [userId]);
      if (rows.length === 0){ return rows.length; }
  
      const userLocation = rows[0].location;
  
      // Find sellers within the specified radius
      // update this to find products and image urls
      // this is the most import query in this program
      // search for product maybe ilike the user is looking for
      // also use the category the user is searching in 
      const sellersQuery = `
        SELECT 
            s.seller_id, s.store_name, s.store_description, ul.latitude, ul.longitude,
            ST_Distance(ul.location::geography, $1::geography) AS distance
        FROM sellers s
        JOIN user_location ul ON s.user_id = ul.user_id
        WHERE ST_DWithin(ul.location::geography, $1::geography, $2 * 1000) -- radius in meters
        ORDER BY distance;
      `;
  
      const result = await pool.query(sellersQuery, [userLocation, radius])
      return result.rows;
    } catch (err){
      throw new Error(err);
    }
  };
  
  

// Create a new seller
const createSeller = async (sellerData) => {
  try {
    const query = `
      INSERT INTO sellers (user_id, store_name, store_description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [sellerData.user_id, sellerData.store_name, sellerData.store_description];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};


const createMultipleSellers = async (sellersData) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const query = `
      INSERT INTO sellers (
        user_id, store_name, store_description
      ) VALUES 
      ${sellersData.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2}, $${i * 3 + 3})`).join(', ')}
      RETURNING *;
    `;
    const values = sellersData.flatMap(seller => [
      seller.store_name,
      seller.store_description
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



// Update a single seller by ID
const updateSeller = async (id, sellerData) => {
  try {
    const query = `
      UPDATE sellers SET
        store_name = $1,
        store_description = $2
      WHERE seller_id = $3
      RETURNING *;
    `;
    const values = [sellerData.store_name, sellerData.store_description, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

// Delete a seller by ID
const deleteSeller = async (id) => {
  try {
    const query = 'DELETE FROM sellers WHERE seller_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllSellers,
  getSellerById,
  getNearBySellers,
  createSeller,
  createMultipleSellers,
  updateSeller,
  deleteSeller
};

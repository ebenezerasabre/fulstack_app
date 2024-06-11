const pool = require('./db');

const createUserLocationTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_location (
      location_id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE NOT NULL,
      street VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      country VARCHAR(100),
      postal_code VARCHAR(20),
      latitude DECIMAL(9,6),
      longitude DECIMAL(9,6),
      location GEOGRAPHY(POINT, 4326), 
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
  `;
  await pool.query(query);
};

createUserLocationTable();

const getAllUserLocations = async () => {
  try {
    const result = await pool.query('SELECT * FROM user_location');
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const getUserLocationById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM user_location WHERE location_id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const createUserLocation = async (userLocationData) => {
  try {
    const query = `
      INSERT INTO user_location (user_id, street, city, state, country, postal_code, latitude, longitude, location)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, ST_SetSRID(ST_MakePoint($9, $10), 4326))
      RETURNING *;
    `;
    const values = [
      userLocationData.user_id,
      userLocationData.street,
      userLocationData.city,
      userLocationData.state,
      userLocationData.country,
      userLocationData.postal_code,
      userLocationData.latitude,
      userLocationData.longitude,
      userLocationData.longitude,
      userLocationData.latitude
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};


const createMultipleUserLocations = async (userLocationsData) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const query = `
      INSERT INTO user_location (
        user_id, street, city, state, country, postal_code, latitude, longitude, location
      ) VALUES 
      ${userLocationsData.map((_, i) => `($${i * 10 + 1}, $${i * 10 + 2}, $${i * 10 + 3}, $${i * 10 + 4}, $${i * 10 + 5}, $${i * 10 + 6}, $${i * 10 + 7}, $${i * 10 + 8}, ST_SetSRID(ST_MakePoint($${i * 10 + 9}, $${i * 10 + 10}), 4326))`).join(', ')}
      RETURNING *;
    `;
    const values = userLocationsData.flatMap(loc => [
      loc.user_id,
      loc.street,
      loc.city,
      loc.state,
      loc.country,
      loc.postal_code,
      loc.latitude,
      loc.longitude,
      loc.latitude,
      loc.longitude
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


const updateUserLocation = async (id, userLocationData) => {
  try {
    const query = `
      UPDATE user_location SET
        street = $1,
        city = $2,
        state = $3,
        country = $4,
        postal_code = $5,
        latitude = $6,
        longitude = $7,
        location = ST_SetSRID(ST_MakePoint($8, $9), 4326),
        updated_at = CURRENT_TIMESTAMP
      WHERE location_id = $10
      RETURNING *;
    `;
    const values = [
      userLocationData.street,
      userLocationData.city,
      userLocationData.state,
      userLocationData.country,
      userLocationData.postal_code,
      userLocationData.latitude,
      userLocationData.longitude,
      userLocationData.longitude,
      userLocationData.latitude,
      id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const deleteUserLocation = async (id) => {
  try {
    const query = 'DELETE FROM user_location WHERE location_id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllUserLocations,
  getUserLocationById,
  createUserLocation,
  createMultipleUserLocations,
  updateUserLocation,
  deleteUserLocation
};

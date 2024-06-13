const pool = require('./db');



// a. Get Products with Best Discounts Including Latitude and Longitude
const getDiscountedProducts = async (user_id) => {
    const userId = user_id; // Assuming you have user ID from authentication middleware
    try {
      const result = await pool.query(`
        SELECT p.product_id, p.product_name, p.product_description, p.price, p.quantity_available,
               d.discount_percentage, d.start_date, d.end_date,
               s.store_name, sl.location AS seller_location,
               ul.location AS user_location,
               ST_Distance(sl.location::geography, ul.location::geography) AS distance
        FROM products p
        JOIN discounts d ON p.product_id = d.product_id
        JOIN sellers s ON p.seller_id = s.seller_id
        JOIN user_location sl ON s.seller_id = sl.user_id
        JOIN user_location ul ON ul.user_id = $1
        WHERE d.start_date <= CURRENT_DATE AND d.end_date >= CURRENT_DATE
        ORDER BY d.discount_percentage DESC;
      `, [userId]);
      return result.rows;
    } catch (err) {
      return new Error(err);
    }
  };

//a. Get Discounted Products Matching Search Criteria Including Latitude and Longitude
const getDiscountedProducts_search = async (user_id, search) => {
    const userId = user_id; // Assuming you have user ID from authentication middleware
    const searchTerm = search; // Assuming search term is passed as a query parameter
    try {
      const result = await pool.query(`
        SELECT p.product_id, p.product_name, p.product_description, p.price, p.quantity_available,
               d.discount_percentage, d.start_date, d.end_date,
               s.store_name, sl.location AS seller_location,
               ul.location AS user_location,
               ST_Distance(sl.location::geography, ul.location::geography) AS distance
        FROM products p
        JOIN discounts d ON p.product_id = d.product_id
        JOIN sellers s ON p.seller_id = s.seller_id
        JOIN user_location sl ON s.seller_id = sl.user_id
        JOIN user_location ul ON ul.user_id = $1
        WHERE (to_tsvector('english', p.product_name || ' ' || coalesce(p.product_description, '')) @@ to_tsquery('english', $2)
               OR p.product_name ILIKE $3
               OR similarity(p.product_name, $3) > 0.3)
          AND d.start_date <= CURRENT_DATE
          AND d.end_date >= CURRENT_DATE
        ORDER BY d.discount_percentage DESC
        LIMIT 10;
      `, [userId, searchTerm, `%${searchTerm}%`]);
      return result.rows;
    } catch (err) {
      return new Error(err);
    }
  };
  



// b. Get Products Closest to the User Including Latitude and Longitude
const getClosestProducts = async (user_id) => {
    const userId = user_id; // Assuming you have user ID from authentication middleware
    try {
      const result = await pool.query(`
        SELECT p.product_id, p.product_name, p.product_description, p.price, p.quantity_available,
               s.store_name, sl.location AS seller_location,
               ul.location AS user_location,
               ST_Distance(sl.location::geography, ul.location::geography) AS distance
        FROM products p
        JOIN sellers s ON p.seller_id = s.seller_id
        JOIN user_location sl ON s.seller_id = sl.user_id
        JOIN user_location ul ON ul.user_id = $1
        ORDER BY distance;
      `, [userId]);
      return result.rows;
    } catch (err) {
      throw new Error(err);
    }
  };


  //b. Get Closest Products Matching Search Criteria Including Latitude and Longitude
const getClosestProducts_search = async (user_id, search) => {
    const userId = user_id; // Assuming you have user ID from authentication middleware
    const searchTerm = search; // Assuming search term is passed as a query parameter
    try {
      const result = await pool.query(`
        SELECT p.product_id, p.product_name, p.product_description, p.price, p.quantity_available,
               s.store_name, sl.location AS seller_location,
               ul.location AS user_location,
               ST_Distance(sl.location::geography, ul.location::geography) AS distance
        FROM products p
        JOIN sellers s ON p.seller_id = s.seller_id
        JOIN user_location sl ON s.seller_id = sl.user_id
        JOIN user_location ul ON ul.user_id = $1
        WHERE to_tsvector('english', p.product_name || ' ' || coalesce(p.product_description, '')) @@ to_tsquery('english', $2)
               OR p.product_name ILIKE $3
               OR similarity(p.product_name, $3) > 0.3
        ORDER BY distance
        LIMIT 10;
      `, [userId, searchTerm, `%${searchTerm}%`]);
        return result.rows;
    } catch (err) {
        return new Error(err);
    }
  };
  
  



// c. Get Discounted Products Closest to the User Including Latitude and Longitude
const getDiscountedClosestProducts = async (user_id) => {
    const userId = user_id; // Assuming you have user ID from authentication middleware
    try {
      const result = await pool.query(`
        SELECT p.product_id, p.product_name, p.product_description, p.price, p.quantity_available,
               d.discount_percentage, d.start_date, d.end_date,
               s.store_name, sl.location AS seller_location,
               ul.location AS user_location,
               ST_Distance(sl.location::geography, ul.location::geography) AS distance
        FROM products p
        JOIN discounts d ON p.product_id = d.product_id
        JOIN sellers s ON p.seller_id = s.seller_id
        JOIN user_location sl ON s.seller_id = sl.user_id
        JOIN user_location ul ON ul.user_id = $1
        WHERE d.start_date <= CURRENT_DATE AND d.end_date >= CURRENT_DATE
        ORDER BY d.discount_percentage DESC, distance;
      `, [userId]);
      return result.rows;
    } catch (err) {
        return new Error(err);
    }
  };
  


// c. Get Discounted Products Closest to the User Including Latitude and Longitude
//const getDiscountedClosestProducts_search = async (req, res) => {
    //const userId = req.user.id; // Assuming you have user ID from authentication middleware
    //const searchTerm = req.query.search; // Assuming search term is passed as a query parameter
const getDiscountedClosestProducts_search = async (user_id, search) => {   
    const userID = user_id;
    const searchTerm = search;
    try {
      const result = await pool.query(`
        SELECT p.product_id, p.product_name, p.product_description, p.price, p.quantity_available,
               d.discount_percentage, d.start_date, d.end_date,
               s.store_name, sl.location AS seller_location,
               ul.location AS user_location,
               ST_Distance(sl.location::geography, ul.location::geography) AS distance
        FROM products p
        JOIN discounts d ON p.product_id = d.product_id
        JOIN sellers s ON p.seller_id = s.seller_id
        JOIN user_location sl ON s.seller_id = sl.user_id
        JOIN user_location ul ON ul.user_id = $1
        WHERE (to_tsvector('english', p.product_name || ' ' || coalesce(p.product_description, '')) @@ to_tsquery('english', $2)
               OR p.product_name ILIKE $3
               OR similarity(p.product_name, $3) > 0.3)
          AND d.start_date <= CURRENT_DATE
          AND d.end_date >= CURRENT_DATE
        ORDER BY d.discount_percentage DESC, distance
        LIMIT 10;
      `, [userId, searchTerm, `%${searchTerm}%`]);
        return result.rows;
      //res.status(200).json(result.rows);
    } catch (err) {
        return new Error(err);
      //res.status(500).json({ message: err.message });
    }
};
  
  


  module.exports = {
    getDiscountedProducts,
    getDiscountedProducts_search,
    getClosestProducts,
    getClosestProducts_search,
    getDiscountedClosestProducts,
    getDiscountedClosestProducts_search
  };
  


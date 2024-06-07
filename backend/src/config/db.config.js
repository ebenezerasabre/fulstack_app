require('dotenv').config();

/*
module.exports = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
};
*/


module.exports = {
  user: "postgres",
  host: "localhost",
  database: "onlinestore",
  password: "1995",
  port: 5432,
};

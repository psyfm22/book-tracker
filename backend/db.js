//Loads the settings from the dotenv file
require("dotenv").config();

//Imports the mysql library
const mysql = require("mysql2/promise");

//Sets up the pool using the database credentials
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


//Allows other files to use pool
module.exports = pool;
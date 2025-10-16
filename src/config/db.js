import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

console.log("user",process.env.DB_USER);
console.log("host",process.env.DB_HOST);
console.log("database",process.env.DB_DATABASE);
console.log("pass",process.env.DB_PASSWORD);
console.log("port",process.env.DB_PORT);
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,   
  database: process.env.DB_DATABASE,     
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {  
    console.log('Connected to the database');
});

export default pool;
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('posts.db');

// db.serialize(() => {
//   db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)');
// });

// module.exports = db;


const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // For RDS SSL; adjust if using custom CA
  },
});

// Create table if it doesn't exist
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL
      );
    `);
    console.log('✅ PostgreSQL: Table "posts" is ready.');
  } catch (err) {
    console.error('❌ Error creating table:', err.message);
  }
})();

module.exports = pool;

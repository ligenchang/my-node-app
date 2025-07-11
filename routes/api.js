const express = require('express');
const router = express.Router();
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

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
router.post('/posts', async (req, res) => {
  const { content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (content) VALUES ($1) RETURNING id',
      [content]
    );
    res.status(201).json({ id: result.rows[0].id, content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

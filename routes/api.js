const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('posts.db');

// Get all posts
router.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create a new post
router.post('/posts', (req, res) => {
  const { content } = req.body;
  db.run('INSERT INTO posts (content) VALUES (?)', [content], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, content });
  });
});

module.exports = router;

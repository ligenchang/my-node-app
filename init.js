const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('posts.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)');
});

module.exports = db;

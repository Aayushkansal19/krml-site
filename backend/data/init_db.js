const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./krml.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log('Database & tables created successfully.');
});

db.run(`INSERT INTO products (name, description, price, image) VALUES
  ('Chakki Atta', 'Stone-ground wheat flour for softness and nutrition.', 60, 'assets/images/atta.jpg'),
  ('Maida', 'Refined wheat flour perfect for baking and snacks.', 55, 'assets/images/maida.jpg'),
  ('Sooji', 'Coarse semolina, ideal for halwa, idli, and upma.', 40, 'assets/images/sooji.jpg')
`);


db.close();

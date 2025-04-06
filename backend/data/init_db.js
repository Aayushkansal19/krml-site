// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./krml.db');

// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS products (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     description TEXT,
//     price REAL,
//     image TEXT
//   )`);

//   db.run(`CREATE TABLE IF NOT EXISTS contacts (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     email TEXT,
//     message TEXT,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   )`);

//   db.run(`
//     ALTER TABLE contacts ADD COLUMN timestamp TEXT
//   `, (err) => {
//     if (err && !err.message.includes("duplicate column name")) {
//       console.error("Error adding timestamp column:", err.message);
//     } else {
//       console.log("✅ Timestamp column ready");
//     }
//   });
  

//   console.log('Database & tables created successfully.');
// });

// db.run(`INSERT INTO products (name, description, price, image) VALUES
//   ('Chakki Atta', 'Stone-ground wheat flour for softness and nutrition.', 60, 'assets/images/atta.jpg'),
//   ('Maida', 'Refined wheat flour perfect for baking and snacks.', 55, 'assets/images/maida.jpg'),
//   ('Sooji', 'Coarse semolina, ideal for halwa, idli, and upma.', 40, 'assets/images/sooji.jpg')
// `);
// // table to see the visitors on mmy site
// db.run(`
//   CREATE TABLE IF NOT EXISTS visits (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     page TEXT,
//     timestamp TEXT
//   )
// `);
// db.run(`ALTER TABLE visits ADD COLUMN ip TEXT`, (err) => {});
// db.run(`ALTER TABLE visits ADD COLUMN location TEXT`, (err) => {});

// db.close();

// _________________________________




const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./krml.db');

db.serialize(() => {
  // Create products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    image TEXT
  )`);

  // Create contacts table
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    timestamp TEXT
  )`);

  // Create visits table
  db.run(`CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT,
    timestamp TEXT,
    ip TEXT,
    location TEXT
  )`);

  // ✅ CHECK if products already exist
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (err) {
      console.error("Error checking product count:", err.message);
      return;
    }

    // ✅ Insert only if there are 0 products
    if (row.count === 0) {
      db.run(`INSERT INTO products (name, description, price, image) VALUES
        ('Chakki Atta', 'Stone-ground wheat flour for softness and nutrition.', 60, 'assets/images/atta.jpg'),
        ('Maida', 'Refined wheat flour perfect for baking and snacks.', 55, 'assets/images/maida.jpg'),
        ('Sooji', 'Coarse semolina, ideal for halwa, idli, and upma.', 40, 'assets/images/sooji.jpg')
      `, (insertErr) => {
        if (insertErr) {
          console.error("Error inserting default products:", insertErr.message);
        } else {
          console.log("✅ Default products inserted.");
        }
      });
    } else {
      console.log(`ℹ️ ${row.count} products already exist. Skipping insert.`);
    }
  });
});

db.close();

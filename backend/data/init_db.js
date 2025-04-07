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

// _________________________
// testing line
const fs = require('fs');
const INIT_FLAG = './backend/data/.db_initialized';

// 🧠 Don't initialize again if already done
if (fs.existsSync(INIT_FLAG)) {
  console.log("✅ Database already initialized. Skipping.");
  process.exit(0);
}
// _________________________________________

// may uncomment
// const fs = require('fs');

const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./krml.db');
const db = new sqlite3.Database(__dirname + '/krml.db');

// const db = new sqlite3.Database('.backend/data/krml.db');

// may uncomment
// const INIT_FLAG = './.db_initialized';

db.serialize(() => {
  // Tables
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    timestamp TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT,
    timestamp TEXT,
    ip TEXT,
    location TEXT
  )`);

  // ✅ Use flag file to prevent reinserting
  if (!fs.existsSync(INIT_FLAG)) {
    db.run(`INSERT INTO products (name, description, price, image) VALUES
      ('Chakki Atta', 'Stone-ground wheat flour for softness and nutrition.', 60, 'assets/images/atta.jpg'),
      ('Maida', 'Refined wheat flour perfect for baking and snacks.', 55, 'assets/images/maida.jpg'),
      ('Sooji', 'Coarse semolina, ideal for halwa, idli, and upma.', 40, 'assets/images/sooji.jpg')
    `, (err) => {
      if (err) {
        console.error("Error inserting products:", err.message);
      } else {
        console.log("✅ Default products inserted.");
        fs.writeFileSync(INIT_FLAG, "Database initialized");
      }
    });
  } else {
    console.log("⚠️ Products already inserted. Skipping default inserts.");
  }
});
// ________________________________________
// testing line
fs.writeFileSync(INIT_FLAG, 'initialized');
// ____________

db.close();

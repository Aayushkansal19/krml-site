const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// qr code generator
// const QRCode = require('qrcode');
//  //  //  //

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Connect SQLite database
// const db = new sqlite3.Database('./data/krml.db');
const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));

// __________________________________________________

// API to GET products

// app.get('/api/products', (req, res) => {
//   db.all("SELECT * FROM products", [], (err, rows) => {
//     if (err) {
//       console.error(err.message);
//       return res.status(500).json({error: err.message});
//     }
//     res.json(rows);
//   });
// });

// const dbPath = path.join(__dirname, 'data', 'krml.db');

// 📦 GET all products
app.get('/api/admin/products', (req, res) => {
  // const db = new sqlite3.Database(dbPath);
  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));
  db.all("SELECT * FROM products ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});







// ➕ POST add a new product
app.post('/api/admin/products', (req, res) => {
  const { name, description, price, image } = req.body;

  if (!name || !description || !price || !image) {
    return res.status(400).json({ status: "All fields required." });
  }

  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));
  const stmt = db.prepare("INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)");

  stmt.run(name, description, price, image, function (err) {
    if (err) {
      console.error("DB Insert Error:", err.message);
      return res.status(500).json({ status: "Error saving product." });
    }
    res.json({ status: "Product added!" });
  });

  stmt.finalize(); // ✅ finalize before closing
  db.close();
});

// ❌ DELETE a product
app.delete('/api/admin/products/:id', (req, res) => {
  const id = req.params.id;
  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));

  const stmt = db.prepare("DELETE FROM products WHERE id = ?");
  stmt.run(id, function (err) {
    if (err) {
      console.error("Delete error:", err.message);
      return res.status(500).json({ status: "Error deleting product." });
    }
    res.json({ status: "Product deleted!" });
  });

  stmt.finalize(); // ✅ prevent SQLITE_BUSY
  db.close();
});


// __________________________________________

// API to POST contact form submissions



// app.post('/api/contact', (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ status: "All fields required." });
//   }

//   const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));

//   const stmt = db.prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
//   stmt.run(name, email, message, function (err) {
//     if (err) {
//       console.error("DB Insert Error:", err.message); // 👈 Important
//       return res.status(500).json({ status: "Error saving message." });
//     }
//     console.log("✅ Contact saved:", name, email); // 👈 Useful for Render Logs
//     res.json({ status: "Message received!" });
//   });

//   stmt.finalize();
//   db.close();
// });

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  const timestamp = new Date().toISOString(); // ⏰ Store date/time

  if (!name || !email || !message) {
    return res.status(400).json({ status: "All fields required." });
  }

  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));
  db.run("INSERT INTO contacts (name, email, message, timestamp) VALUES (?, ?, ?, ?)",
    [name, email, message, timestamp],
    function (err) {
      if (err) {
        console.error("DB Error:", err.message);
        return res.status(500).json({ status: "Error saving message." });
      }
      res.json({ status: "Message received!" });
      db.close();
    });
});



app.get('/api/test-db', (req, res) => {
  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));
  db.all("SELECT * FROM contacts", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


// ✅ Admin: GET all contact messages
app.get('/api/admin/messages', (req, res) => {
  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));
  db.all("SELECT * FROM contacts ORDER BY id DESC", (err, rows) => {
    if (err) {
      console.error("Fetch error:", err.message);
      return res.status(500).json({ error: "Error fetching messages" });
    }
    res.json(rows);
    db.close();
  });
});


app.delete('/api/admin/messages/:id', (req, res) => {
  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));
  db.run("DELETE FROM contacts WHERE id = ?", req.params.id, function(err) {
    if (err) {
      console.error("Delete error:", err.message);
      return res.status(500).json({ status: "Error deleting message" });
    }
    res.json({ status: "Message deleted!" });
    db.close();
  });
});



// __________________________________________________________________________________________________


// qrcode rouute js

// app.get('/api/qr/:id', (req, res) => {
//   const productId = req.params.id;

//   db.get("SELECT name FROM products WHERE id = ?", [productId], (err, row) => {
//     if (err || !row) {
//       return res.status(404).send("Product not found");
//     }

//     // Use this path or replace it with your deployed product detail view
//     const productUrl = `https://krml.in/products.html?id=${productId}`;
//     // const productUrl = `https://krml-site.onrender.com/products.html?id=${productId}`; // replace with your actual domain

//     QRCode.toDataURL(productUrl, (err, qrCodeUrl) => {
//       if (err) {
//         console.error("QR generation error:", err);
//         return res.status(500).send("Error generating QR code");
//       }
//       res.send(`<img src="${qrCodeUrl}" alt="QR Code for ${row.name}"/>`);
//     });
//   });
// });


// // // // //



// app.get('/download-db', (req, res) => {
//   const filePath = path.join(__dirname, 'data', 'krml.db'); // Adjust path if needed
//   res.download(filePath, 'krml-exported.db', err => {
//     if (err) {
//       console.error("❌ Error sending DB file:", err);
//       res.status(500).send("Error downloading database.");
//     } else {
//       console.log("✅ DB file sent successfully");
//     }
//   });
// });

// 🌐 Public API to fetch products for main site
app.get('/api/products', (req, res) => {
  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));

  db.all("SELECT * FROM products ORDER BY id DESC", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
    db.close();
  });
});


// API to see the visitors on my site

app.post('/api/track', (req, res) => {
  const page = req.body.page;
  const timestamp = new Date().toISOString();

  if (!page) return res.status(400).json({ error: "Page is required" });

  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));
  db.run("INSERT INTO visits (page, timestamp) VALUES (?, ?)", [page, timestamp], (err) => {
    if (err) {
      console.error("Tracking error:", err.message);
      return res.status(500).json({ error: "Failed to track" });
    }
    res.json({ status: "Tracked" });
    db.close();
  });
});

// API to get metrics
app.get('/api/admin/visits', (req, res) => {
  const db = new sqlite3.Database(path.join(__dirname, 'data', 'krml.db'));
  db.all("SELECT * FROM visits ORDER BY timestamp DESC", (err, rows) => {
    if (err) {
      console.error("Error fetching metrics:", err.message);
      return res.status(500).json({ error: "Metrics fetch failed" });
    }
    res.json(rows);
    db.close();
  });
});



// Start server
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});



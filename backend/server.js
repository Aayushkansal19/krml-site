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
const db = new sqlite3.Database('./data/krml.db');


// API to GET products
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({error: err.message});
    }
    res.json(rows);
  });
});

// API to POST contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  db.run(`INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`, [name, email, message],
    (err) => {
      if (err) return res.status(500).json({error: err.message});
      res.json({status: "Message received!"});
    });
});


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


// Start server
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

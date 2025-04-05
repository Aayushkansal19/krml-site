// frontend/admin/admin.js

if (window.location.pathname.includes("messages.html")) {
    fetch('https://krml.onrender.com/api/admin/messages')
      .then(res => res.json())
      .then(messages => {
        const container = document.getElementById('messages-container');
        container.innerHTML = "";
  
        if (!messages.length) {
          container.innerHTML = "<p>No messages found.</p>";
          return;
        }
  
        messages.forEach(msg => {
          const div = document.createElement('div');
          div.className = 'message-box';
          div.innerHTML = `
            <strong>${msg.name}</strong> (${msg.email})<br/>
            <p>${msg.message}</p>
            <button onclick="deleteMessage(${msg.id})">🗑️ Delete</button>
          `;
          container.appendChild(div);
        });
      });
  
    window.deleteMessage = function(id) {
      if (!confirm("Delete this message?")) return;
  
      fetch(`https://krml.onrender.com/api/admin/messages/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        alert(data.status);
        location.reload();
      });
    };
  }
  

//   js for login page

// Frontend session-based login
const isLoggedIn = () => sessionStorage.getItem("krml_admin") === "true";

// Redirect if not logged in
const protectedPages = ["index.html", "messages.html", "products.html"];
if (protectedPages.some(page => window.location.pathname.includes(page)) && !isLoggedIn()) {
  window.location.href = "login.html";
}

// Login form handler
if (window.location.pathname.includes("login.html")) {
  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const password = document.getElementById("adminPassword").value;
    const status = document.getElementById("loginStatus");

    // Simple password check (can later connect to backend auth)
    if (password === "abc@123") {
      sessionStorage.setItem("krml_admin", "true");
      window.location.href = "index.html";
    } else {
      status.textContent = "❌ Incorrect password.";
      status.style.color = "red";
    }
  });
}

// log out button 
function logoutAdmin() {
    sessionStorage.removeItem("krml_admin");
    window.location.href = "login.html";
  }
  

  // 🚀 Product Management Page

  
if (window.location.pathname.includes("products.html")) {
    const form = document.getElementById("addProductForm");
    const productList = document.getElementById("productList");
    const status = document.getElementById("productFormStatus");
  
    // 📦 Submit new product
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const product = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDesc").value,
        price: parseFloat(document.getElementById("productPrice").value),
        image: document.getElementById("productImage").value
      };
  
      fetch("https://krml.onrender.com/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(data => {
        status.textContent = data.status;
        status.style.color = "green";
        form.reset();
        loadProducts(); // Refresh product list
      })
      .catch(err => {
        console.error("Add failed:", err);
        status.textContent = "Error adding product.";
        status.style.color = "red";
      });
    });
  
    // 🧲 Load all products
    function loadProducts() {
      fetch("https://krml.onrender.com/api/admin/products")
        .then(res => res.json())
        .then(products => {
          productList.innerHTML = "";
          if (!products.length) {
            productList.innerHTML = "<p>No products yet.</p>";
            return;
          }
  
          products.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
  
            card.innerHTML = `
              <img src="${p.image}" alt="${p.name}">
              <h3>${p.name}</h3>
              <p>${p.description}</p>
              <p><strong>₹${p.price}</strong></p>
              <button onclick="deleteProduct(${p.id})">🗑️</button>
            `;
  
            productList.appendChild(card);
          });
        });
    }
  
    // ❌ Delete product
    window.deleteProduct = function (id) {
      if (!confirm("Delete this product?")) return;
  
      fetch(`https://krml.onrender.com/api/admin/products/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        alert(data.status);
        loadProducts();
      });
    };
  
    // 🚀 Load products on page load
    loadProducts();
  }
  
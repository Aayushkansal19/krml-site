// frontend/admin/admin.js
// __________________________________________________________________
// JS for message 


  

// if (window.location.pathname.includes("messages.html")) {
//     fetch('https://krml.onrender.com/api/admin/messages')
//       .then(res => res.json())
//       .then(messages => {
//         const container = document.getElementById('messages-container');
//         container.innerHTML = "";
  
//         if (!messages.length) {
//           container.innerHTML = "<p>No messages yet.</p>";
//           return;
//         }
  
//         messages.forEach(msg => {
//           const div = document.createElement('div');
//           div.className = 'message-box';
//           div.innerHTML = `
//             <strong>${msg.name}</strong> (<em>${msg.email}</em>)<br/>
//             <p>${msg.message}</p>
//             <button onclick="deleteMessage(${msg.id})">🗑️ Delete</button>
//           `;
//           container.appendChild(div);
//         });
//       });
  
//     // ✅ DELETE handler
//     window.deleteMessage = function(id) {
//       if (!confirm("Delete this message?")) return;
  
//       fetch(`https://krml.onrender.com/api/admin/messages/${id}`, {
//         method: 'DELETE'
//       })
//       .then(res => res.json())
//       .then(data => {
//         alert(data.status);
//         location.reload();
//       });
//     };
//   }


function loadMessages() {
    fetch('https://krml.onrender.com/api/admin/messages')
      .then(res => res.json())
      .then(messages => {
        const container = document.getElementById('messages-container');
        container.innerHTML = "";
  
        if (!messages.length) {
          container.innerHTML = "<p>No messages yet.</p>";
          return;
        }
  
        messages.forEach(msg => {
          const div = document.createElement('div');
          div.className = 'message-box';
  
          // Format date/time
          const time = new Date(msg.timestamp).toLocaleString();
  
          div.innerHTML = `
            <strong>${msg.name}</strong> (<em>${msg.email}</em>)<br/>
            <p>${msg.message}</p>
            <small>🕒 ${time}</small><br/>
            <button onclick="deleteMessage(${msg.id})">🗑️ Delete</button>
          `;
          container.appendChild(div);
        });
      });
  }
  
  // ✅ Load on page load
  loadMessages();
  
  // 🔁 Auto-refresh every 10 seconds
  setInterval(loadMessages, 10000);
  
  // ❌ DELETE
  window.deleteMessage = function (id) {
    if (!confirm("Delete this message?")) return;
  
    fetch(`https://krml.onrender.com/api/admin/messages/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        alert(data.status);
        loadMessages();
      });
  };
  

// _______________________________________________________  

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
//   API for metrics on admin page

if (window.location.pathname.includes("metrics.html")) {
    let barChart, pieChart;
  
    const BASE_URL = window.location.origin;
  
    function fetchMetrics() {
      Promise.all([
        fetch(`${BASE_URL}/api/admin/visits`).then(res => res.json()),
        fetch(`${BASE_URL}/api/admin/messages-count`).then(res => res.json())
      ]).then(([visits, messageData]) => {
        const visitTable = visits
        .slice(0, 5)
        .map(v => `
          <div style="margin-bottom: 8px;">
            <strong>${v.page}</strong> — ${v.location || "Unknown Location"} <br/>
            <small>🕒 ${new Date(v.timestamp).toLocaleString()}</small>
          </div>
        `)
        .join('');
        console.log("Visits data:", visits);
        console.log("Messages count:", messageData);

      document.getElementById("recent-visits").innerHTML = `
        <h3 style="margin-bottom: 10px;">🌐 Recent Visitors</h3>
        ${visitTable}
      `;
    

        const labels = Object.keys(pageCounts);
        const values = Object.values(pageCounts);
  
        // Destroy old charts if they exist
        if (barChart) barChart.destroy();
        if (pieChart) pieChart.destroy();
  
        const ctxBar = document.getElementById("barChart").getContext("2d");
        barChart = new Chart(ctxBar, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: "Visits Per Page",
              data: values,
              backgroundColor: '#4caf50',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            }
          }
        });
  
        const ctxPie = document.getElementById("pieChart").getContext("2d");
        pieChart = new Chart(ctxPie, {
          type: 'pie',
          data: {
            labels,
            datasets: [{
              data: values,
              backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        });
      });
    }
  


    // 🗂️ Show recent 5 visits with page + location + time
const visitTable = visits
.slice(0, 5)
.map(v => `
  <div style="margin-bottom: 8px;">
    <strong>${v.page}</strong> — ${v.location} <br/>
    <small>🕒 ${new Date(v.timestamp).toLocaleString()}</small>
  </div>
`)
.join('');

document.getElementById("recent-visits").innerHTML = `
<h3 style="margin-bottom: 10px;">🌐 Recent Visitors</h3>
${visitTable}
`;

    
    
    fetchMetrics();
    setInterval(fetchMetrics, 15000); // Refresh every 15 seconds
  }


  
  
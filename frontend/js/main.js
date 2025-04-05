document.addEventListener('DOMContentLoaded', () => {
    console.log("KRML Frontend Loaded Successfully");
  });


document.addEventListener('DOMContentLoaded', () => {
    // Product loader
    // fetch('http://localhost:5000/api/products')
    //   .then(res => res.json())
    //   .then(products => {
    //     const container = document.getElementById('product-container');
    //     container.innerHTML = ""; // Clear previous
  
    //     products.forEach(product => {
    //       const card = document.createElement('div');
    //       card.className = 'product-card fade-in';
  
    //       card.innerHTML = `
    //         <img src="${product.image}" alt="${product.name}" class="product-img">
    //         <div class="product-info">
    //           <h2>${product.name}</h2>
    //           <p>${product.description}</p>
    //           <p class="price">₹${product.price}</p>
    //           <div id="qrcode-${product.id}" class="qrcode"></div>
    //           <a href="assets/brochures/${product.name.toLowerCase().replace(/\s/g, '-')}.pdf" download class="download-btn">Download Brochure</a>
    //         </div>
    //       `;
  
    //       container.appendChild(card);
  
    //       // Generate QR Code
    //       new QRCode(document.getElementById(`qrcode-${product.id}`), {
    //         text: `http://localhost:5000/api/products/${product.id}`,
    //         width: 100,
    //         height: 100,
    //       });


// products listing on product webpage

  // ______________________________________________________________________________________
    // fetch('http://localhost:5000/api/products')
    // fetch('http://192.168.233.7:5000/api/products')
    // fetch(`${window.location.origin}/api/products`)
  // _______________________________________________________________________________________
  //   fetch('https://krml.onrender.com/api/products')

  // .then(res => res.json())
  // .then(products => {
  //   const container = document.getElementById('product-container');
  //   container.innerHTML = "";

  //   products.forEach(product => {
  //     const card = document.createElement('div');
  //     card.className = 'product-card fade-in';

  //     const qrContainerId = `qrcode-${product.id}`;

  //     card.innerHTML = `
  //       <img src="${product.image}" alt="${product.name}" class="product-img">
  //       <div class="product-info">
  //         <h2>${product.name}</h2>
  //         <p>${product.description}</p>
  //         <p class="price">₹${product.price}</p>
  //         <div id="${qrContainerId}" class="qrcode"></div>
  //         <a href="assets/brochures/${product.name.toLowerCase().replace(/\s/g, '-')}.pdf" download class="download-btn">Download Brochure</a>
  //       </div>
  //     `;

  //     container.appendChild(card);

  //     // ✅ Generate the QR Code after the element is added to DOM
  //     new QRCode(document.getElementById(qrContainerId), {
  //       // text: `http://localhost:5000/api/products/${product.id}`,
  //       text: `assets/brochures/${product.name.toLowerCase().replace(/\s/g, '-')}.pdf`,

  //       // text: `http://localhost:5000/product-detail.html?id=${product.id}`,


  //       width: 100,
  //       height: 100,
  //     });
  //       });
  //     })
  //     .catch(err => {
  //       console.error("Product loading failed:", err);
  //       document.getElementById('product-container').innerHTML = "<p>Error loading products. Try again later.</p>";
  //     });
  // });
  

  fetch('https://krml.onrender.com/api/products')
  .then(res => res.json())
  .then(products => {
    console.log("Fetched products:", products); // 👈 ADD THIS
    const container = document.getElementById('product-container');
    container.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card fade-in';

      const qrContainerId = `qrcode-${product.id}`;

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-info">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p class="price">₹${product.price}</p>
          <div id="${qrContainerId}" class="qrcode"></div>
          <a href="assets/brochures/${product.name.toLowerCase().replace(/\s/g, '-')}.pdf" download class="download-btn">Download Brochure</a>
        </div>
      `;

      container.appendChild(card);

      new QRCode(document.getElementById(qrContainerId), {
        text: `assets/brochures/${product.name.toLowerCase().replace(/\s/g, '-')}.pdf`,
        width: 100,
        height: 100,
      });
    });
  })
  .catch(err => {
    console.error("Product loading failed:", err);
    document.getElementById('product-container').innerHTML = "<p>Error loading products. Try again later.</p>";
  });
});



  // Modified product card generation with QR code
// products.forEach(product => {
//     const card = document.createElement('div');
//     card.className = 'product-card';
  
//     card.innerHTML = `
//       <img src="${product.image}" alt="${product.name}">
//       <h2>${product.name}</h2>
//       <p>${product.description}</p>
//       <p class="price">₹${product.price}</p>
//       <div id="qrcode-${product.id}" class="qrcode"></div>
//     `;
  
//     productContainer.appendChild(card);
  
//     // Generate QR Code (local URL or info)
//     new QRCode(document.getElementById(`qrcode-${product.id}`), {
//       text: `http://localhost:5000/api/products/${product.id}`,
//       width: 100,
//       height: 100,
//     });
//   });
  
  document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      autoplay: { delay: 4000, disableOnInteraction: false },
    });
  });
  
  new Swiper('.swiper-container', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    autoplay: { delay: 4000, disableOnInteraction: false },
  });
// couter section js

const counters = document.querySelectorAll('.count');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});


// Video modal open/close
const openBtn = document.getElementById("openVideo");
const modal = document.getElementById("videoModal");
const closeBtn = document.getElementById("closeVideo");

openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    const video = modal.querySelector('video');
    video.currentTime = 0;
    video.play();
  });
  

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modal.querySelector('video').pause();
  });
  

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modal.querySelector('video').pause();
  }
});

// swiper js

new Swiper('.swiper-container', {
  loop: true,
  effect: 'fade', // or 'slide'
  grabCursor: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  speed: 800,
  fadeEffect: {
    crossFade: true
  }
});

// nutritional value chartin product page

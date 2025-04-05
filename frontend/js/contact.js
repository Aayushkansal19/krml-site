// document.getElementById('contactForm').addEventListener('submit', (e) => {
//     e.preventDefault();
  
//     const statusDiv = document.getElementById('form-status');
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const message = document.getElementById('message').value;
//   // form for contact us 
//     // fetch('http://localhost:5000/api/contact', {
//       fetch('https://krml.onrender.com/api/contact', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name, email, message })
//     })
//     .then(res => res.json())
//     .then(data => {
//       statusDiv.textContent = data.status;
//       statusDiv.style.color = "green";
//       document.getElementById('contactForm').reset();
//     })
//     .catch(err => {
//       console.error(err);
//       statusDiv.textContent = "Error submitting form. Please try again.";
//       statusDiv.style.color = "red";
//     });
//   });
  
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const statusDiv = document.getElementById('form-status');

  fetch('https://krml.onrender.com/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(async res => {
    if (!res.ok) throw new Error("Failed to submit form");
    const data = await res.json();
    statusDiv.textContent = data.status || "Message sent!";
    statusDiv.style.color = "green";
    document.getElementById('contactForm').reset();
  })
  .catch(err => {
    console.error("Form submission failed:", err);
    statusDiv.textContent = "Error submitting form. Please try again.";
    statusDiv.style.color = "red";
  });
});

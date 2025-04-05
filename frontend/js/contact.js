document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const statusDiv = document.getElementById('form-status');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })
    .then(res => res.json())
    .then(data => {
      statusDiv.textContent = data.status;
      statusDiv.style.color = "green";
      document.getElementById('contactForm').reset();
    })
    .catch(err => {
      console.error(err);
      statusDiv.textContent = "Error submitting form. Please try again.";
      statusDiv.style.color = "red";
    });
  });
  
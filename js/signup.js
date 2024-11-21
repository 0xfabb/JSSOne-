document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Hash the password using bcrypt (can be omitted if you handle it server-side)
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Send the user data to the server (mocked with fetch here)
    const userData = { username, email, password: hashedPassword };
  
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('jwt', data.token); // Store JWT in localStorage for future requests
        alert('Sign up successful!');
        window.location.href = 'login.html'; // Redirect to login page
      } else {
        alert('Sign up failed! ' + data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  });
  
  
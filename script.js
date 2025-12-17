document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent the form from submitting the default way
    event.preventDefault();

    // Get the input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Simple frontend validation
    if (username.trim() === '' || password.trim() === '') {
        errorMessage.textContent = 'Please fill in all fields.';
        errorMessage.style.display = 'block';
        return; // Stop the function if validation fails
    }

    // In a REAL application, you would send a request to your server here
    // using fetch() or XMLHttpRequest to validate the credentials.

    // This is a SIMULATION for demonstration purposes only.
    // Let's assume correct credentials are "admin" and "password123"
    if (username === 'admin' && password === 'password123') {
        // Hide any previous error message
        errorMessage.style.display = 'none';
        // Simulate a successful login redirect
        alert('Login Successful! Redirecting to dashboard...');
        // In a real scenario, you would redirect like this:
        // window.location.href = 'dashboard.html';
    } else {
        // Show an error message for incorrect credentials
        errorMessage.textContent = 'Invalid username or password.';
        errorMessage.style.display = 'block';
    }
});

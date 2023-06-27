const loginForm = document.getElementById('loginForm');
const errorElement = document.getElementById('error');
const registerElement = document.querySelector('.sign-up'); // Seleccionamos el botón con la clase "sign-up"


loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Aquí entro");

    if (response.ok) {
        const data = await response.json();
        const { user, token } = data;
        const infoMessage = `Login successful. User: ${user}, Token: ${token}`;
        const encodedMessage = encodeURIComponent(infoMessage);
        //const url = `http://127.0.0.1:5000/public/home/home.html?info=${encodedMessage}`;
        window.open("http://127.0.0.1:5500/public/home/home.html");
    } else {
      const data = await response.json();
      const { message } = data;
      showError(message);
      console.log("usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    showError('An error occurred. Please try again later.');
  }
});

function showError(message) {
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function openNewPage(infoMessage) {
    const encodedMessage = encodeURIComponent(infoMessage);
    //const url = `http://127.0.0.1:5000/public/home/home.html?info=${encodedMessage}`;
    window.location.href = `http://www.google.com`;
}

registerElement.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/public/Register.html";
});

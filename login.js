document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    //function login();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var url = "http://168.194.207.98:8081/tp/login.php?user=" + encodeURIComponent(username) + "&pass=" + encodeURIComponent(password);
   
    fetch(url)
  
    .then(response => response.json())
    .then(data => {
        console.log(data); // Imprimir la respuesta en la consola para verificar
        if (data.respuesta === 'OK') {
            window.location.href = "lista.html"; // Redireccionar a lista.html si el inicio de sesión fue exitoso
        } else {
            alert(data.mje); // Mostrar mensaje de error al usuario
        }
    })
    .catch(error => console.error('Error al iniciar sesión:', error));
});
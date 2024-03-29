function searchUser() {
    var query = document.getElementById('searchInput').value;
    var url = `http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=${encodeURIComponent(query)}`;

    fetch(url)
    .then(response => response.json())
    .then(data => displayUsers(data))
    .catch(error => console.error('Error al buscar usuarios:', error));
}

function displayUsers(users) {
    var tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        var row = tableBody.insertRow();
        row.insertCell().textContent = user.id;
        row.insertCell().textContent = user.usuario;
        row.insertCell().textContent = user.bloqueado;
        row.insertCell().textContent = user.apellido;
        row.insertCell().textContent = user.nombre;

        var blockCell = row.insertCell();
        var blockButton = document.createElement('button');
        blockButton.textContent = 'Bloquear';
        blockButton.onclick = function() {
            updateUserStatus(user.id, 'Y');
        };
        blockCell.appendChild(blockButton);

        var unblockCell = row.insertCell();
        var unblockButton = document.createElement('button');
        unblockButton.textContent = 'Desbloquear';
        unblockButton.onclick = function() {
            updateUserStatus(user.id, 'N');
        };
        unblockCell.appendChild(unblockButton);

        row.className = user.bloqueado === 'Y' ? 'blocked' : 'unblocked';
    });
}

function updateUserStatus(userId, status) {
    var url = `http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${userId}&estado=${status}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.respuesta === 'OK') {
            alert('Estado actualizado correctamente.');
            searchUser(); // Actualizar la lista de usuarios después de bloquear/desbloquear
        } else {
            alert(data.mje);
        }
    })
    .catch(error => console.error('Error al actualizar estado del usuario:', error));
}

// Cargar todos los usuarios al cargar la página
searchUser();
fetch('/users')
  .then(response => response.json())
  .then(users => {
    const tableBody = document.querySelector('#userTable tbody');
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.ID}</td>
        <td>${user.EMAIL}</td>
        <td>
          <button onclick="editUser(${user.ID}, '${user.EMAIL}')">Editar</button>
          <button onclick="deleteUser(${user.ID})">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  });

function deleteUser(userId) {
  fetch('/users', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: userId })
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.reload();
    });
}

function editUser(userId, currentEmail) {
  const newEmail = prompt('Nuevo email:', currentEmail);
  if (!newEmail) return;

  const newPassword = prompt('Nueva contraseña:');
  if (!newPassword) return; 

  fetch(`/api/usuarios/editar/${userId}`, {
    method: 'PUT',   
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: newEmail,
      password: newPassword
    })
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.reload();
    })
    .catch(error => {
      console.error('Error al actualizar usuario:', error);
      alert('Hubo un problema al actualizar el usuario.');
    });
}

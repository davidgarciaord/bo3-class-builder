const API_URL = 'http://localhost:3000';

export async function registerRequest(userData) {
  const existingResponse = await fetch(`${API_URL}/users?email=${userData.email}`);
  const existingUsers = await existingResponse.json();

  if (existingUsers.length > 0) {
    throw new Error('Ese email ya está registrado');
  }

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: 'user'
    })
  });

  if (!response.ok) {
    throw new Error('No se pudo registrar el usuario');
  }

  return response.json();
}

export async function loginRequest(credentials) {

  const response = await fetch(`${API_URL}/users?email=${credentials.email}`);

  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }

  const users = await response.json();

  if (users.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  const user = users[0];

  if (user.password !== credentials.password) {
    throw new Error('Credenciales incorrectas');
  }

  return {
    token: `fake-token-${user.id}`,
    user
  };
}
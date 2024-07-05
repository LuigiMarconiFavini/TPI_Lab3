import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://localhost:7226/authenticate?UserName=${username}&Password=${password}`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        return response.text(); // Cambiar a .text() para manejar el token JWT
      })
      .then((token) => {
        console.log('Token from server:', token);

        // Guardamos el token y el nombre de usuario en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        // Obtiene todos los usuarios para determinar el rol
        fetch('https://localhost:7226/api/User/GetAll')
          .then((response) => response.json())
          .then((users) => {
            const user = users.find((u) => u.name === username);
            if (!user) {
              throw new Error('User not found in the list');
            }

            const role = user.role;
            if (role === 'admin') {
              navigate('/admin');
            } else if (role === 'dev') {
              navigate('/dev');
            } else if (role === 'client') {
              navigate('/client'); // Redirigir a la pantalla del cliente
            } else {
              navigate('/'); // Si no se especifica un rol válido, redirigir a la página principal
            }
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
            // Manejar errores al obtener usuarios aquí
          });
      })
      .catch((error) => {
        console.error('Error during authentication:', error);
        // Manejar errores de autenticación aquí, por ejemplo, mostrar un mensaje de error al usuario
      });
  };

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <img
            src="https://images.vexels.com/media/users/3/135209/isolated/preview/a67ec0d80495805bad57b083095c6b21-signo-de-smartphone-con-fondo-redondo.png"
            alt="logo"
            className="logo-img"
          />
          <div className="logo-text">Tienda Smartphones</div>
        </div>
      </header>
      <div className="dev-screen-container">
        <div className="login-container">
          <h1>Inicia Sesión</h1>
          {/* Tu formulario de login aquí */}
          <button className="btn btn-link">
            <Link to="/register">Crear cuenta</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
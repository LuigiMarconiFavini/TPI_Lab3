import React, { useState } from 'react';
import './Register.css'; // Archivo CSS para el diseño
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await fetch('https://localhost:7226/api/Client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role: 'user' }) // Asumiendo que el rol por defecto es 'user'
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      console.log('Registro exitoso:', data);
      // Redirigir al login o manejar el registro de otra forma
    } catch (error) {
      setError('Error al crear la cuenta.');
    }
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
          <h1>Crea tu cuenta de usuario</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Repetir Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Crear Cuenta</button>
          </form>
          <button className="btn btn-link">
            <Link to="/login">Si ya estás registrado, Iniciar sesión</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

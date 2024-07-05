import { useState } from 'react';
import './Register.css'; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        name,
        email,
        password,
        role: 'client',
      };

      const response = await fetch('https://localhost:7226/api/Client/CreateClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        alert('Registro exitoso. Por favor inicia sesión.');
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear la cuenta.');
      }
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      setError('Error al crear la cuenta.');
    }
  };

  return (
    <div>
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
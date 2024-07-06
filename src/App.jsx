import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/login/Login';
import HomePage from './components/homePage/HomePage';
import AdminScreen from './components/adminScreen/AdminScreen';
import DevScreen from './components/devScreen/DevScreen';
import PropTypes from 'prop-types';
import Register from './components/register/Register';
import CheckoutPage from './components/checkoutPage/CheckoutPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (token && storedUsername) {
      fetch('https://localhost:7226/api/User/GetAll')
        .then((response) => response.json())
        .then((users) => {
          const user = users.find((u) => u.name === storedUsername);
          if (user) {
            setIsLoggedIn(true);
            setRole(user.role);
          }
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    } else {
      setIsLoggedIn(false);
      setRole('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setRole('');
  };

  const handleLogin = (isLoggedIn, role) => {
    setIsLoggedIn(isLoggedIn);
    setRole(role);
  };

  const PrivateRoute = ({ element, allowedRoles, ...rest }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/" />;
    }

    return <Route {...rest} element={element} />;
  };

  PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && (
          <>
            {role === 'admin' && <AdminScreen />}
            {role === 'dev' && <DevScreen />}
            <button onClick={handleLogout}>Cerrar Sesión {role} </button> 
          </>
        )}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
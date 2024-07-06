import './Header.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ onSearch }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleSearchClick = () => {
    setIsSearching(!isSearching);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Invoca la función de búsqueda con el nuevo valor 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="https://images.vexels.com/media/users/3/135209/isolated/preview/a67ec0d80495805bad57b083095c6b21-signo-de-smartphone-con-fondo-redondo.png" alt="logo" className="logo-img" />
        <div className="logo-text">Tienda Smartphones</div>
      </div>
      <button className="contact-button">Contáctanos!</button>
      <div className="icons">
        {isSearching && (
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar productos..."
              className="search-input"
            />
            <button type="submit" className="search-button">🔍</button>
          </form>
        )}
        <span className="icon" onClick={handleSearchClick}>🔍</span>
        <span className="icon" onClick={() => navigate('/cart')}>🛒</span>
        {isLoggedIn ? (
          <span className="icon" onClick={handleLogout} >
            🚪 Cerrar Sesión
          </span>
        ) : (
          <span className="icon" onClick={() => navigate('/login')}>
            👤
          </span>
        )}

      </div>
    </header>
  );
}

export default Header;
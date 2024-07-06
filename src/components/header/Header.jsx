import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ShoppingCartModal from '../shoppingCartModal/ShoppingCartModal';

function Header({ onSearch }) {
  const navigate = useNavigate();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openCartModal = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery('');
    onSearch('');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="https://images.vexels.com/media/users/3/135209/isolated/preview/a67ec0d80495805bad57b083095c6b21-signo-de-smartphone-con-fondo-redondo.png" alt="logo" className="logo-img" />
        <div className="logo-text">Tienda Smartphones</div>
      </div>
      <button className="contact-button">Contáctanos!</button>
      <div className="icons">
        <span className="icon" onClick={handleSearchIconClick}>🔍</span>
        {isSearchOpen && (
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar..."
            className="search-input"
          />
        )}
        <span className="icon" onClick={openCartModal}>🛒</span>
        <span className="icon" onClick={() => navigate('/login')}>👤</span>
      </div>
      {isCartModalOpen && (
        <ShoppingCartModal cartItems={cartItems} closeModal={closeCartModal} total={calculateTotal()} />
      )}
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;

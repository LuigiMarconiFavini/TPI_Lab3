import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo-container">
        <img src="https://images.vexels.com/media/users/3/135209/isolated/preview/a67ec0d80495805bad57b083095c6b21-signo-de-smartphone-con-fondo-redondo.png" alt="logo" className="logo-img" />
        <div className="logo-text">Tienda Smartphones</div>
      </div>
      <button className="contact-button">Contáctanos!</button>
      <div className="icons">
        <span className="icon" onClick={() => navigate('/search')}>🔍</span>
        <span className="icon" onClick={() => navigate('/cart')}>🛒</span>
        <span className="icon" onClick={() => navigate('/login')}> 👤</span>
        
      </div>
    </header>
  );
}

export default Header;
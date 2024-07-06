import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    const cartTotal = storedCart.reduce((total, item) => total + item.precio * item.cantidad, 0);
    const totalWithIVA = cartTotal * 1.21;
    setTotal(totalWithIVA);
  }, []);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = () => {
    alert(`Compra realizada con éxito. Total con IVA: $${total.toFixed(2)}`);
    localStorage.removeItem('cart'); 
    navigate('/');
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    const cartTotal = updatedCart.reduce((total, item) => total + item.precio * item.cantidad, 0);
    const totalWithIVA = cartTotal * 1.21;
    setTotal(totalWithIVA);
  };

  return (
    <div className="checkout-page">
      <div className="order-summary">
        <h2>Tu Pedido</h2>
        {cartItems.map(item => (
          <div key={item.productId} className="order-item">
            <span>{item.marca} - {item.precio} x {item.cantidad}</span>
            <button onClick={() => removeFromCart(item.productId)}>Eliminar</button>
          </div>
        ))}
        <div className="total">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
      <div className="payment-method">
        <h2>Forma de Pago</h2>
        <select onChange={handlePaymentChange} value={paymentMethod}>
          <option value="">Selecciona un método de pago</option>
          <option value="bank">🏦 Transferencia Bancaria</option>
          <option value="creditCard">💳 Tarjeta de Crédito</option>
          <option value="paypal">💵 PayPal</option>
        </select>
        <button onClick={handleCheckout}>Finalizar Compra</button>
      </div>
    </div>
  );
};

CheckoutPage.propTypes = {
  paymentMethod: PropTypes.string,
  total: PropTypes.number,
};

export default CheckoutPage;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      navigate('/login');
      return;
    }

    fetch(`https://localhost:7226/api/ShoppingCart/GetShoppingCart/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error('Error fetching cart:', error));
  }, [navigate]);

  if (!localStorage.getItem('username') || !localStorage.getItem('token')) {
    return <div>Please log in to see your shopping cart.</div>;
  }

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.productName} - {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
import PropTypes from 'prop-types';
import './ProductDetailModal.css';
import { useNavigate } from 'react-router-dom';

function ProductDetailModal({ product, closeModal }) {
  const navigate = useNavigate();

  const addToCart = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      navigate('/login');
      return;
    }

    fetch(`https://localhost:7226/api/ShoppingCart/AddProductToCart/${username}/${product.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Producto agregado al carrito');
          closeModal();
        } else {
          alert('Error al agregar el producto al carrito');
        }
      })
      .catch((error) => console.error('Error adding product to cart:', error));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <img src={product.image} alt={product.marca} />
        <div className="modal-details">
          <h2>{product.marca}</h2>
          <p>{product.descripcion}</p>
          <p>Price: {product.precioUnitario}</p>
          <button onClick={addToCart}>AGREGAR AL CARRITO</button>
        </div>
      </div>
    </div>
  );
}

ProductDetailModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precioUnitario: PropTypes.number.isRequired,
    descuento: PropTypes.number,
    stock: PropTypes.number,
    activo: PropTypes.bool,
    image: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ProductDetailModal;
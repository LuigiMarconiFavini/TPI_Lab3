import PropTypes from 'prop-types';
import './ShoppingCartModal.css';

function ShoppingCartModal({ cartItems, closeModal, total }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Mi Compra</h2>
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.productId} className="cart-item">
              <img src={item.image} alt={item.marca} />
              <div>
                <h3>{item.marca}</h3>
                <p>Precio: {item.precio}</p>
                <p>Cantidad: {item.cantidad}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <p>Total: ${total}</p>
          <button>Iniciar Compra</button>
        </div>
      </div>
    </div>
  );
}

ShoppingCartModal.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  closeModal: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default ShoppingCartModal;
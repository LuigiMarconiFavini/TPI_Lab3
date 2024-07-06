import PropTypes from 'prop-types';
import './ProductDetailModal.css';

function ProductDetailModal({ product, closeModal }) {

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.productId === product.id);

    if (existingProduct) {
      existingProduct.cantidad += 1;
    } else {
      cart.push({
        productId: product.id,
        marca: product.marca,
        precio: product.precioUnitario,
        cantidad: 1,
        image: product.image,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
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
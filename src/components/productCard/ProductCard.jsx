import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard({ product, openModal }) {
  const getModelFromDescription = (description) => {
    return description.split(' ').slice(0, 2).join(' ');
  };

  return (
    <div className="product-card" onClick={() => openModal(product)}>
      <img src={product.image} alt={product.marca} />
      <h3>{product.marca}</h3>
      <p>{getModelFromDescription(product.descripcion)}</p>
      <p>{product.precioUnitario}</p>
      <button>COMPRAR</button>
    </div>
  );
}

ProductCard.propTypes = {
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
  openModal: PropTypes.func.isRequired,
};

export default ProductCard;
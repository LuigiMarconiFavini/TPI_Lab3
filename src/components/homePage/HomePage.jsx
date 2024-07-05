import { useState, useEffect } from 'react';
import Header from '../header/Header';
import ProductCard from '../productCard/ProductCard';
import ProductDetailModal from '../productDetailModal/ProductDetailModal';
import Footer from '../footer/Footer';
import './HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://localhost:7226/api/Producto/GetProductList')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="Home">
      <Header />
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} openModal={openModal} />
        ))}
      </div>
      {isModalOpen && <ProductDetailModal product={selectedProduct} closeModal={closeModal} />}
      <Footer />
    </div>
  );
}

export default HomePage;
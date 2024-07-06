import { useState, useEffect } from 'react';
import Header from '../header/Header';
import ProductCard from '../productCard/ProductCard';
import ProductDetailModal from '../productDetailModal/ProductDetailModal';
import Footer from '../footer/Footer';
import './HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://localhost:7226/api/Producto/GetProductList')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
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

  const handleSearch = (query) => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.marca.toLowerCase().includes(lowerCaseQuery) ||
          product.descripcion.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="Home">
      <Header onSearch={handleSearch} />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} openModal={openModal} />
        ))}
      </div>
      {isModalOpen && <ProductDetailModal product={selectedProduct} closeModal={closeModal} />}
      <Footer />
    </div>
  );
}

export default HomePage;
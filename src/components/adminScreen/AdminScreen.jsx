import { useState, useEffect } from 'react';
import './AdminScreen.css';


const AdminScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [newProduct, setNewProduct] = useState({ marca: '', descripcion: '', precioUnitario: '', descuento: 0, stock: '', activo: true, image: '' });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7226/api/Producto/GetProductList')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(selectedTab === tab ? null : tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      precioUnitario: parseFloat(newProduct.precioUnitario),
      descuento: parseFloat(newProduct.descuento),
      stock: newProduct.stock ? parseInt(newProduct.stock) : null,
    };

    fetch('https://localhost:7226/api/Producto/CreateProduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToAdd),
    })
      .then(response => response.json())
      .then(data => {
        setProducts(prevProducts => [...prevProducts, data]);
        setNewProduct({ marca: '', descripcion: '', precioUnitario: '', descuento: 0, stock: '', activo: true, image: '' });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setSelectedTab('editar');
  };

  const handleUpdateProduct = () => {
    const productToUpdate = {
      ...editProduct,
      precioUnitario: parseFloat(editProduct.precioUnitario),
      descuento: parseFloat(editProduct.descuento),
      stock: editProduct.stock ? parseInt(editProduct.stock) : null,
    };

    fetch(`https://localhost:7226/api/Producto/UpdateProduct/${editProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToUpdate),
    })
      .then(response => response.json())
      .then(data => {
        setProducts(prevProducts => prevProducts.map(p => (p.id === data.id ? data : p)));
        setEditProduct(null);
        setSelectedTab('modificar');
      })
      .catch(error => console.error('Error updating product:', error));
  };

  const handleDeleteProduct = (id) => {
    fetch(`https://localhost:7226/api/Producto/DeleteProduct/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="admin-screen">
      <h1>Cuenta Admin</h1>
      <div className="tabs">
        <div className="tab" onClick={() => handleTabChange('agregar')}>
          <span>AGREGAR PRODUCTO</span>
          <div className="icon">
            <img src={`/icons/${selectedTab === 'agregar' ? 'toggle-close-icon.png' : 'toggle-open-icon.png'}`} alt="Toggle" />
          </div>
        </div>
        {selectedTab === 'agregar' && (
          <div className="add-product-form">
            <div className="form-left">
              <div className="image-upload">
                <img src="/icons/add-image-icon.png" alt="Add Image" />
                <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} placeholder="URL de la Imagen" />
              </div>
            </div>
            <div className="form-right">
              <div className="form-group">
                <div className="form-icon">
                  <img src="/icons/add-brand-icon.png" alt="Add Brand" />
                </div>
                <label>
                  <input name="marca" value={newProduct.marca} onChange={handleInputChange} placeholder="Marca del Producto" />
                </label>
              </div>
              <div className="form-group">
                <div className="form-icon">
                  <img src="/icons/add-description-icon.png" alt="Add Description" />
                </div>
                <label>
                  <input name="descripcion" value={newProduct.descripcion} onChange={handleInputChange} placeholder="Modelo y Descripción (Camara / Memoria / RAM / Pantalla) " />
                </label>
              </div>
              <div className="form-group">
                <div className="form-icon">
                  <img src="/icons/add-price-icon.png" alt="Add Price" />
                </div>
                <label>
                  <input name="precioUnitario" value={newProduct.precioUnitario} onChange={handleInputChange} placeholder="Añadir Precio" />
                </label>
              </div>
              <div className="form-group">
                <div className="form-icon">
                  <img src="/icons/add-discount-icon.png" alt="Add Discount" />
                </div>
                <label>
                  <input name="descuento" value={newProduct.descuento} onChange={handleInputChange} placeholder="Añadir Descuento" />
                </label>
              </div>
              <div className="form-group">
                <div className="form-icon">
                  <img src="/icons/add-brand-icon.png" alt="Add Stock" />
                </div>
                <label>
                  <input name="stock" value={newProduct.stock} onChange={handleInputChange} placeholder="Añadir Stock" />
                </label>
              </div>
            </div>
            <button onClick={handleAddProduct}>Agregar Producto</button>
          </div>
        )}

        <div className="tab" onClick={() => handleTabChange('modificar')}>
          <span>MODIFICAR/ELIMINAR PRODUCTO</span>
          <div className="icon">
            <img src={`/icons/${selectedTab === 'modificar' ? 'toggle-close-icon.png' : 'toggle-open-icon.png'}`} alt="Toggle" />
          </div>
        </div>
        {selectedTab === 'modificar' && (
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-item">
                <span>{product.marca}</span>
                <span>{product.descripcion}</span>
                <span>{product.stock}</span>
                <div className="product-buttons">
                  <button className="edit-button" onClick={() => handleEditProduct(product)}>
                    <img src="/icons/edit-icon.png" alt="Edit" /> Modificar
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>
                    <img src="/icons/delete-icon.png" alt="Delete" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'editar' && editProduct && (
          <div className="edit-product-form">
            <div className="form-left">
              <div className="image-upload">
                <img src="/icons/add-image-icon.png" alt="Add Image" />
                <input type="text" name="image" value={editProduct.image} onChange={handleEditInputChange} placeholder="URL de la Imagen" />
              </div>
            </div>
            <div className="form-right">
              <div className="form-group">
                <div className="form-icon">
                  <img src="/icons/add-brand-icon.png" alt="Add Brand" />
                </div>
                <label>
                  <input name="marca" value={editProduct.marca} onChange={handleEditInputChange} placeholder="Marca y Modelo del Producto" />
                </label>
              </div>
              <div className="form-group">
                <div className="form-icon">
                  <img src="/icons/add-description-icon.png" alt="Add Description" />
                </div>
                <label>
                  <input name="descripcion" value={editProduct.descripcion} onChange={handleEditInputChange} placeholder="Añadir Descripción" />
                </label>
              </div>
              <div className="form-group">
                <div className="form-icon">
                  <img src="/icons/add-price-icon.png" alt="Add Price" />
                </div>
                <label>
                  <input name="precioUnitario" value={editProduct.precioUnitario} onChange={handleEditInputChange} placeholder="Añadir Precio" />
                </label>
              </div>
              <div className="form-group">
                <div className="form-icon">
                  <img src="/icons/add-discount-icon.png" alt="Add Discount" />
                </div>
                <label>
                  <input name="descuento" value={editProduct.descuento} onChange={handleEditInputChange} placeholder="Añadir Descuento" />
                </label>
              </div>
              <div className="form-group">
              <div className="form-icon">
                  <img src="/icons/add-brand-icon.png" alt="Add Stock" />
                </div>
                <label>
                  <input name="stock" value={editProduct.stock} onChange={handleEditInputChange} placeholder="Añadir Stock" />
                </label>
              </div>
            </div>
            <button onClick={handleUpdateProduct}>Actualizar Producto</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminScreen;
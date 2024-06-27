import { useState, useEffect } from 'react';
import './DevScreen.css';

const DevScreen = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [nombreCompleto, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [admins, setAdmins] = useState([]);
  const [editAdmin, setEditAdmin] = useState(null);

  const handleTabChange = (tab) => {
    setSelectedTab(selectedTab === tab ? null : tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAdmin = {
      name: nombreCompleto,
      email: correo,
      password: contrasena,
      role: "admin",
      activo: true
    };

    try {
      const response = await fetch('https://localhost:7226/api/Admin/CreateAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAdmin)
      });

      if (response.ok) {
        alert('Cuenta de Admin creada exitosamente');
        setNombre('');
        setCorreo('');
        setContrasena('');
        fetchAdmins(); // Update the admin list
      } else {
        alert('Hubo un error al crear la cuenta de Admin');
      }
    } catch (error) {
      console.error('Error al crear cuenta de Admin:', error);
      alert('Hubo un error al crear la cuenta de Admin');
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch('https://localhost:7226/api/Admin/GetAllAdmin');
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      const response = await fetch(`https://localhost:7226/api/Admin/DeleteAdmin/${id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        alert('Cuenta eliminada exitosamente');
        setAdmins(admins.filter(admin => admin.id !== id));
      } else {
        alert('Hubo un error al eliminar la cuenta');
      }
    } catch (error) {
      console.error('Error al eliminar cuenta de Admin:', error);
      alert('Hubo un error al eliminar la cuenta de Admin');
    }
  };

  const handleEditAdmin = (admin) => {
    setEditAdmin(admin);
    setSelectedTab('editar');
  };

  const handleUpdateAdmin = async () => {
    try {
      const response = await fetch(`https://localhost:7226/api/Admin/UpdateAdmin/${editAdmin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editAdmin)
      });

      if (response.ok) {
        alert('Cuenta de Admin actualizada exitosamente');
        setEditAdmin(null);
        setSelectedTab(null);
        fetchAdmins(); 
      } else {
        alert('Hubo un error al actualizar la cuenta de Admin');
      }
    } catch (error) {
      console.error('Error al actualizar cuenta de Admin:', error);
      alert('Hubo un error al actualizar la cuenta de Admin');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="dev-screen-container">
      <div className="tabs">
        <div className="tab" onClick={() => handleTabChange('cuentaSysAdmin')}>
          <span>CUENTA SYSADMIN</span>
          <div className="icon">
            <img src={`/icons/${selectedTab === 'cuentaSysAdmin' ? 'toggle-close-icon.png' : 'toggle-open-icon.png'}`} alt="Toggle" />
          </div>
        </div>
        {selectedTab === 'cuentaSysAdmin' && (
          <div className="add-sysadmin-form">
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="title">
                <h2>CREAR CUENTA ADMIN</h2>
              </div>
              <label>Nombre</label>
              <input
                type="text"
                value={nombreCompleto}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <label>Correo Electrónico</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <label>Contraseña</label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              <button type="submit">CREAR CUENTA</button>
            </form>
          </div>
        )}

        <div className="tab" onClick={() => handleTabChange('eliminarUsuario')}>
          <span>¿Desea eliminar/modificar un Usuario?</span>
          <div className="icon">
            <img src={`/icons/${selectedTab === 'eliminarUsuario' ? 'toggle-close-icon.png' : 'toggle-open-icon.png'}`} alt="Toggle" />
          </div>
        </div>
        {selectedTab === 'eliminarUsuario' && (
          <div className="admin-list">
            {admins.map((admin, index) => (
              <div key={index} className="admin-item">
                <span>id: {admin.id}</span>
                <span>Nombre: {admin.name}</span>
                <span> Email: {admin.email}</span>
                <span> Rol : {admin.role}</span>
                <div className="admin-buttons">
                  <button className="edit-button" onClick={() => handleEditAdmin(admin)}>
                    <img src="/icons/edit-icon.png" alt="Edit" /> Modificar
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteAdmin(admin.id)}>
                    <img src="/icons/delete-icon.png" alt="Delete" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'editar' && editAdmin && (
          <div className="edit-admin-form">
            <form onSubmit={handleUpdateAdmin} className="admin-form">
              <div className="title">
                <h2>MODIFICAR CUENTA ADMIN</h2>
              </div>
              <label>Nombre</label>
              <input
                type="text"
                value={editAdmin.name}
                onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
                required
              />
              <label>Correo Electrónico</label>
              <input
                type="email"
                value={editAdmin.email}
                onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                required
              />
              <label>Contraseña</label>
              <input
                type="password"
                value={editAdmin.password}
                onChange={(e) => setEditAdmin({ ...editAdmin, password: e.target.value })}
                required
              />
              <button type="submit">ACTUALIZAR CUENTA</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevScreen;
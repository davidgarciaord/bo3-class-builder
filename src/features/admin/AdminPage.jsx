import { useEffect, useState } from 'react';

function AdminPage() {
  const [weapons, setWeapons] = useState([]);
  const [maps, setMaps] = useState([]);
  const [classes, setClasses] = useState([]);

  const [weaponForm, setWeaponForm] = useState({
    name: '',
    type: '',
    damage: '',
    fireRate: '',
    description: '',
    image: ''
  });

  const [mapForm, setMapForm] = useState({
    name: '',
    description: '',
    image: ''
  });

  const loadWeapons = async () => {
    const response = await fetch('http://localhost:3000/weapons');
    const data = await response.json();
    setWeapons(data);
  };

  const loadMaps = async () => {
    const response = await fetch('http://localhost:3000/maps');
    const data = await response.json();
    setMaps(data);
  };

  const loadClasses = async () => {
    const response = await fetch('http://localhost:3000/classes');
    const data = await response.json();
    setClasses(data);
  };

  useEffect(() => {
    loadWeapons();
    loadMaps();
    loadClasses();
  }, []);

  const handleDeleteWeapon = async (id) => {
    await fetch(`http://localhost:3000/weapons/${id}`, {
      method: 'DELETE'
    });

    loadWeapons();
  };

  const handleDeleteClass = async (id) => {
    await fetch(`http://localhost:3000/classes/${id}`, {
      method: 'DELETE'
    });

    loadClasses();
  };

  const handleDeleteMap = async (id) => {
    await fetch(`http://localhost:3000/maps/${id}`, {
      method: 'DELETE'
    });

    loadMaps();
  };

  const handleWeaponChange = (e) => {
    const { name, value } = e.target;
    setWeaponForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMapChange = (e) => {
    const { name, value } = e.target;
    setMapForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddWeapon = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/weapons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...weaponForm,
        damage: weaponForm.damage
      })
    });

    if (!response.ok) {
      alert('No se pudo añadir el arma');
      return;
    }

    setWeaponForm({
      name: '',
      type: '',
      damage: '',
      fireRate: '',
      description: '',
      image: ''
    });

    loadWeapons();
  };

  const handleAddMap = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/maps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mapForm)
    });

    if (!response.ok) {
      alert('No se pudo añadir el mapa');
      return;
    }

    setMapForm({
      name: '',
      description: '',
      image: ''
    });

    loadMaps();
  };

  return (
    <section className="admin-screen">
      <div className="page-header-bo3">
        <p className="section-label">CONTROL PANEL</p>
        <h2>ADMIN</h2>
      </div>

      <div className="admin-section">
        <h3 className="admin-title">Añadir arma</h3>

        <form className="admin-form" onSubmit={handleAddWeapon}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={weaponForm.name}
            onChange={handleWeaponChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Tipo"
            value={weaponForm.type}
            onChange={handleWeaponChange}
            required
          />
          <input
            type="text"
            name="damage"
            placeholder="Daño"
            value={weaponForm.damage}
            onChange={handleWeaponChange}
            required
          />
          <input
            type="text"
            name="fireRate"
            placeholder="Cadencia"
            value={weaponForm.fireRate}
            onChange={handleWeaponChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="/images/weapons/nombre.png"
            value={weaponForm.image}
            onChange={handleWeaponChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={weaponForm.description}
            onChange={handleWeaponChange}
            required
          />
          <button type="submit" className="bo3-main-btn">
            AÑADIR ARMA
          </button>
        </form>
      </div>

      <div className="admin-section">
        <h3 className="admin-title">Gestionar armas</h3>

        {weapons.length === 0 ? (
          <div className="admin-box">
            <p>No hay armas disponibles.</p>
          </div>
        ) : (
          <div className="admin-grid">
            {weapons.map((weapon) => (
              <div key={weapon.id} className="admin-box">
                <h3>{weapon.name}</h3>
                <p><strong>Tipo:</strong> {weapon.type}</p>
                <p><strong>Daño:</strong> {weapon.damage}</p>
                <p><strong>Cadencia:</strong> {weapon.fireRate}</p>
                <p>{weapon.description}</p>

                <button
                  className="bo3-delete-btn"
                  onClick={() => handleDeleteWeapon(weapon.id)}
                >
                  BORRAR ARMA
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-section">
        <h3 className="admin-title">Añadir mapa</h3>

        <form className="admin-form" onSubmit={handleAddMap}>
          <input
            type="text"
            name="name"
            placeholder="Nombre del mapa"
            value={mapForm.name}
            onChange={handleMapChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="/images/maps/nombre.jpg"
            value={mapForm.image}
            onChange={handleMapChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descripción del mapa"
            value={mapForm.description}
            onChange={handleMapChange}
            required
          />
          <button type="submit" className="bo3-main-btn">
            AÑADIR MAPA
          </button>
        </form>
      </div>

      <div className="admin-section">
        <h3 className="admin-title">Gestionar mapas</h3>

        {maps.length === 0 ? (
          <div className="admin-box">
            <p>No hay mapas disponibles.</p>
          </div>
        ) : (
          <div className="admin-grid">
            {maps.map((map) => (
              <div key={map.id} className="admin-box">
                <h3>{map.name}</h3>
                <p>{map.description}</p>

                <button
                  className="bo3-delete-btn"
                  onClick={() => handleDeleteMap(map.id)}
                >
                  BORRAR MAPA
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-section">
        <h3 className="admin-title">Gestionar clases de usuarios</h3>

        {classes.length === 0 ? (
          <div className="admin-box">
            <p>No hay clases guardadas.</p>
          </div>
        ) : (
          <div className="admin-grid">
            {classes.map((item) => (
              <div key={item.id} className="admin-box">
                <h3>{item.name}</h3>
                <p><strong>User ID:</strong> {item.userId}</p>
                <p><strong>Principal:</strong> {item.primaryWeapon || 'Sin arma'}</p>
                <p><strong>Secundaria:</strong> {item.secondaryWeapon || 'Sin arma'}</p>
                <p><strong>Perk 1:</strong> {item.perk1}</p>
                <p><strong>Perk 2:</strong> {item.perk2}</p>

                <button
                  className="bo3-delete-btn"
                  onClick={() => handleDeleteClass(item.id)}
                >
                  BORRAR CLASE
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminPage;
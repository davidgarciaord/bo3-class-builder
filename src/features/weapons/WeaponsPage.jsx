import { useEffect, useState } from 'react';

function WeaponsPage() {
  const [weaponsData, setWeaponsData] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  useEffect(() => {
    const loadWeapons = async () => {
      const response = await fetch('http://localhost:3000/weapons');
      const data = await response.json();
      setWeaponsData(data);
      setSelectedWeapon(data[0]);
    };

    loadWeapons();
  }, []);

  if (!selectedWeapon) {
    return <p>Cargando armas...</p>;
  }

  return (
    <section className="weapons-screen">
      <div className="page-header-bo3">
        <p className="section-label">ARSENAL</p>
        <h2>ARMAS</h2>
      </div>

      <div className="weapons-layout">
        <div className="weapons-list-panel">
          <p className="panel-heading">PRIMARY</p>

          <div className="weapons-grid-mini">
            {weaponsData.map((weapon) => (
              <button
                key={weapon.id}
                className={`weapon-mini-card ${
                  selectedWeapon.id === weapon.id ? 'active' : ''
                }`}
                onClick={() => setSelectedWeapon(weapon)}
              >
                <img src={weapon.image} alt={weapon.name} />
                <span>{weapon.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="weapon-detail-panel">
          <div className="weapon-detail-header">
            <p className="weapon-detail-type">{selectedWeapon.type}</p>
            <h3>{selectedWeapon.name}</h3>
            <p>{selectedWeapon.description}</p>
          </div>

          <div className="weapon-image-box">
            <img src={selectedWeapon.image} alt={selectedWeapon.name} />
          </div>

          <div className="weapon-stats">
            <div className="stat-box">
              <span>Daño</span>
              <strong>{selectedWeapon.damage}</strong>
            </div>
            <div className="stat-box">
              <span>Cadencia</span>
              <strong>{selectedWeapon.fireRate}</strong>
            </div>
            <div className="stat-box">
              <span>Clase</span>
              <strong>{selectedWeapon.type}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeaponsPage;
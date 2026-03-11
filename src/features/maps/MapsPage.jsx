import { useEffect, useState } from 'react';

function MapsPage() {
  const [mapsData, setMapsData] = useState([]);

  useEffect(() => {
    const loadMaps = async () => {
      const response = await fetch('http://localhost:3000/maps');
      const data = await response.json();
      setMapsData(data);
    };

    loadMaps();
  }, []);

  return (
    <section className="maps-screen">
      <div className="page-header-bo3">
        <p className="section-label">COMBAT ZONES</p>
        <h2>MAPAS</h2>
      </div>

      <div className="maps-grid-bo3">
        {mapsData.map((map) => (
          <article key={map.id} className="map-card-bo3">
            <div className="map-image-wrap">
              <img
                src={`${import.meta.env.BASE_URL}images/maps/${map.image}`}
                alt={map.name}
              />
            </div>
            <div className="map-info">
              <h3>{map.name}</h3>
              <p>{map.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MapsPage;
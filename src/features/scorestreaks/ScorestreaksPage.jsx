import { useState } from 'react';
import { scorestreaks } from '../../data/scorestreaks';

function ScorestreaksPage() {
  const [selectedStreak, setSelectedStreak] = useState(scorestreaks[0]);

  return (
    <section className="scorestreaks-screen">
      <div className="page-header-bo3">
        <p className="section-label">TACTICAL SUPPORT</p>
        <h2>RACHAS</h2>
      </div>

      <div className="scorestreaks-layout">
        <div className="scorestreaks-list-panel">
          <p className="panel-heading">DISPONIBLES</p>

          <div className="scorestreaks-list">
            {scorestreaks.map((streak) => (
              <button
                key={streak.id}
                type="button"
                className={`scorestreak-row ${selectedStreak.id === streak.id ? 'active' : ''}`}
                onClick={() => setSelectedStreak(streak)}
              >
                <span className="scorestreak-name">{streak.name}</span>
                <span className="scorestreak-points">{streak.points} pts</span>
              </button>
            ))}
          </div>
        </div>

        <div className="scorestreaks-detail-panel">
          <div className="scorestreaks-image-box">
            <img src={selectedStreak.image} alt={selectedStreak.name} />
          </div>

          <div className="scorestreaks-info-box">
            <p className="scorestreak-type">{selectedStreak.type}</p>
            <h3>{selectedStreak.name}</h3>
            <p className="scorestreak-description">{selectedStreak.description}</p>

            <div className="scorestreak-stats">
              <div className="scorestreak-stat-card">
                <span>Puntos</span>
                <strong>{selectedStreak.points}</strong>
              </div>

              <div className="scorestreak-stat-card">
                <span>Función</span>
                <strong>{selectedStreak.type}</strong>
              </div>

              <div className="scorestreak-stat-card">
                <span>Estado</span>
                <strong>Operativo</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScorestreaksPage;
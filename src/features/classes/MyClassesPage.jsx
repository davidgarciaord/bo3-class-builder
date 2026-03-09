import { useEffect, useState } from 'react';
import { useAuthStore } from '../auth/authStore';
import { useNavigate } from 'react-router-dom';

function MyClassesPage() {
  const { user } = useAuthStore();
  const [savedClasses, setSavedClasses] = useState([]);
  const navigate = useNavigate();

  const loadClasses = async () => {
    try {
      const response = await fetch('http://localhost:3000/classes');
      const data = await response.json();

      const filteredClasses = data.filter(
        (item) => String(item.userId) === String(user?.id)
      );

      setSavedClasses(filteredClasses);
    } catch (error) {
      console.error('Error cargando clases:', error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadClasses();
    }
  }, [user]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/classes/${id}`, {
      method: 'DELETE'
    });

    loadClasses();
  };

  return (
    <section className="myclasses-screen">
      <div className="page-header-bo3">
        <p className="section-label">PLAYER LOADOUTS</p>
        <h2>MIS CLASES</h2>
      </div>

      <div className="classes-grid-bo3">
        {savedClasses.length === 0 ? (
          <div className="empty-box-bo3">
            <p>No tienes clases guardadas todavía.</p>
          </div>
        ) : (
          savedClasses.map((item) => (
            <article key={item.id} className="class-card-bo3">
              <h3>{item.name}</h3>
              <p><strong>Principal:</strong> {item.primaryWeapon || 'Sin arma'}</p>
              <p><strong>Secundaria:</strong> {item.secondaryWeapon || 'Sin arma'}</p>

              <div className="class-attachments-box">
                <p><strong>Accesorio 1:</strong> {item.attachment1 || 'Sin accesorio'}</p>
                <p><strong>Accesorio 2:</strong> {item.attachment2 || 'Sin accesorio'}</p>
                <p><strong>Accesorio 3:</strong> {item.attachment3 || 'Sin accesorio'}</p>
              </div>

              <p><strong>Perk 1:</strong> {item.perk1}</p>
              <p><strong>Perk 2:</strong> {item.perk2}</p>
              <p><strong>Mapa:</strong> {item.recommendedMap || 'Sin mapa'}</p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  className="bo3-main-btn"
                  onClick={() => navigate(`/edit-class/${item.id}`)}
                >
                  EDITAR
                </button>

                <button
                  className="bo3-delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  BORRAR
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default MyClassesPage;
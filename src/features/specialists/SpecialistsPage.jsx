import { specialists } from "../../data/specialists";

function SpecialistsPage() {

  return (
    <section className="specialists-screen">

      <div className="page-header-bo3">
        <p className="section-label">COMBAT OPERATORS</p>
        <h2>ESPECIALISTAS</h2>
      </div>

      <div className="specialists-grid">

        {specialists.map((spec) => (

          <article key={spec.id} className="specialist-card">

            <img src={spec.image} alt={spec.name} />

            <div className="specialist-overlay">

              <h3>{spec.name}</h3>
              <h4>{spec.ability}</h4>

              <p>{spec.description}</p>

            </div>

          </article>

        ))}

      </div>

    </section>
  );

}

export default SpecialistsPage;
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { perk1Options, perk2Options } from '../../data/perks';
import { attachments } from '../../data/attachments';
import { useAuthStore } from '../auth/authStore';
import { toast } from 'react-toastify';

function CreateClassPage() {
  const { register, handleSubmit, reset, watch } = useForm();
  const attachment1 = watch('attachment1');
  const attachment2 = watch('attachment2');
  const { user } = useAuthStore();

  const [weapons, setWeapons] = useState([]);
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const weaponsResponse = await fetch('http://localhost:3000/weapons');
      const mapsResponse = await fetch('http://localhost:3000/maps');

      const weaponsData = await weaponsResponse.json();
      const mapsData = await mapsResponse.json();

      setWeapons(weaponsData);
      setMaps(mapsData);
    };

    loadData();
  }, []);

  const onSubmit = async (data) => {
    const response = await fetch('http://localhost:3000/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        userId: String(user?.id)
      })
    });

    if (!response.ok) {
      toast.error('No se pudo guardar la clase');
      return;
    }

    reset();
    toast.success('Clase guardada correctamente');
  };

  return (
    <section className="form-screen">
      <div className="page-header-bo3">
        <p className="section-label">LOADOUT SYSTEM</p>
        <h2>CREAR CLASE</h2>
      </div>

      <form className="bo3-form-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid-bo3">
          <div>
            <label>Nombre de la clase</label>
            <input {...register('name')} />
          </div>

          <div>
            <label>Arma principal</label>
            <select {...register('primaryWeapon')}>
              {weapons.map((weapon) => (
                <option key={weapon.id} value={weapon.name}>
                  {weapon.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Arma secundaria</label>
            <select {...register('secondaryWeapon')}>
              {weapons.map((weapon) => (
                <option key={weapon.id} value={weapon.name}>
                  {weapon.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Accesorio 1</label>
            <select {...register('attachment1')}>
              <option value="">Sin accesorio</option>
              {attachments.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Accesorio 2</label>
            <select {...register('attachment2')}>
              <option value="">Sin accesorio</option>
              {attachments
                .filter((a) => a.name !== attachment1)
                .map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label>Accesorio 3</label>
            <select {...register('attachment3')}>
              <option value="">Sin accesorio</option>
              {attachments
                .filter((a) => a.name !== attachment1 && a.name !== attachment2)
                .map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label>Ventaja 1</label>
            <select {...register('perk1')}>
              {perk1Options.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>

            <p className="perk-description">
              {perk1Options.find((p) => p.name === watch('perk1'))?.description}
            </p>
          </div>

          <div>
            <label>Ventaja 2</label>
            <select {...register('perk2')}>
              {perk2Options.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>

            <p className="perk-description">
              {perk2Options.find((p) => p.name === watch('perk2'))?.description}
            </p>
          </div>

          <div>
            <label>Mapa recomendado</label>
            <select {...register('recommendedMap')}>
              {maps.map((map) => (
                <option key={map.id} value={map.name}>
                  {map.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="attachments-help-box">
          <h3>Información de accesorios</h3>
          <div className="attachments-help-grid">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="attachment-info-card">
                <strong>{attachment.name}</strong>
                <p>{attachment.description}</p>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="bo3-main-btn">
          GUARDAR CLASE
        </button>
      </form>
    </section>
  );
}

export default CreateClassPage;
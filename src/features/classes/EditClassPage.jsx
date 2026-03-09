import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { perk1Options, perk2Options } from "../../data/perks";
import { attachments } from "../../data/attachments";

function EditClassPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const [weapons,setWeapons] = useState([]);
  const [maps,setMaps] = useState([]);

  useEffect(()=>{

    const loadData = async () => {

      const classResponse = await fetch(`http://localhost:3000/classes/${id}`);
      const classData = await classResponse.json();

      const weaponsResponse = await fetch(`http://localhost:3000/weapons`);
      const mapsResponse = await fetch(`http://localhost:3000/maps`);

      const weaponsData = await weaponsResponse.json();
      const mapsData = await mapsResponse.json();

      setWeapons(weaponsData);
      setMaps(mapsData);

      reset(classData);

    }

    loadData();

  },[])

  const onSubmit = async (data) => {

    const response = await fetch(`http://localhost:3000/classes/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })

    if(!response.ok){
      alert("Error al actualizar la clase")
      return
    }

    alert("Clase actualizada")
    navigate("/my-classes")

  }

  return (

    <section className="form-screen">

      <div className="page-header-bo3">
        <p className="section-label">LOADOUT SYSTEM</p>
        <h2>EDITAR CLASE</h2>
      </div>

      <form className="bo3-form-card" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-grid-bo3">

          <div>
            <label>Nombre</label>
            <input {...register("name")} />
          </div>

          <div>
            <label>Arma principal</label>
            <select {...register("primaryWeapon")}>
              {weapons.map(w=>(
                <option key={w.id} value={w.name}>{w.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Arma secundaria</label>
            <select {...register("secondaryWeapon")}>
              {weapons.map(w=>(
                <option key={w.id} value={w.name}>{w.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Accesorio 1</label>
            <select {...register("attachment1")}>
              {attachments.map(a=>(
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Accesorio 2</label>
            <select {...register("attachment2")}>
              {attachments.map(a=>(
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Accesorio 3</label>
            <select {...register("attachment3")}>
              {attachments.map(a=>(
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Perk 1</label>
            <select {...register("perk1")}>
              {perk1Options.map(p=>(
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Perk 2</label>
            <select {...register("perk2")}>
              {perk2Options.map(p=>(
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Mapa</label>
            <select {...register("recommendedMap")}>
              {maps.map(m=>(
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>

        </div>

        <button className="bo3-main-btn">
          GUARDAR CAMBIOS
        </button>

      </form>

    </section>

  )

}

export default EditClassPage
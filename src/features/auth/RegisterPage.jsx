import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from './authService';

function RegisterPage() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerRequest(data);
      reset();
      alert('Usuario registrado correctamente');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="form-screen">
      <div className="page-header-bo3">
        <p className="section-label">NEW PLAYER</p>
        <h2>REGISTRO</h2>
      </div>

      <form className="bo3-form-card small-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid-bo3 one-column">
          <div>
            <label>Nombre de usuario</label>
            <input {...register('username')} />
          </div>

          <div>
            <label>Email</label>
            <input type="email" {...register('email')} />
          </div>

          <div>
            <label>Contraseña</label>
            <input type="password" {...register('password')} />
          </div>
        </div>

        <button type="submit" className="bo3-main-btn">
          REGISTRARSE
        </button>
      </form>
    </section>
  );
}

export default RegisterPage;
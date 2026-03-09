import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './authStore';
import { loginRequest } from './authService';

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data) => {
    try {
      const response = await loginRequest(data);

      const loggedUser = {
        id: String(response.user.id),
        username: response.user.username,
        email: response.user.email,
        role: response.user.role
      };

      login({
        user: loggedUser,
        token: response.token
      });

      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="form-screen">
      <div className="page-header-bo3">
        <p className="section-label">ACCESS</p>
        <h2>LOGIN</h2>
      </div>

      <form className="bo3-form-card small-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid-bo3 one-column">
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
          INICIAR SESIÓN
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
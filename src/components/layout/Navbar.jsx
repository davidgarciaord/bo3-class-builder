import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/authStore';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          BO3 Loadouts
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/weapons">Armas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/maps">Mapas</NavLink>
            </li>

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create-class">Crear clase</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-classes">Mis clases</NavLink>
                </li>
              </>
            )}

            {user?.role === 'admin' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Admin</NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex gap-2">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Registro</Link>
              </>
            ) : (
              <>
                <span className="text-white align-self-center small">
                  {user.username} ({user.role})
                </span>
                <button onClick={handleLogout} className="btn btn-danger btn-sm">
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
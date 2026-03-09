import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/authStore';

function SidebarMenu() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <aside className="sidebar-bo3">
      <div className="sidebar-overlay" />

      <div className="sidebar-inner">
        <div className="game-logo-box">
          <p className="game-featured">FEATURED</p>
          <h1 className="game-title">
            BLACK OPS <span>III</span>
          </h1>
          <p className="game-subtitle">BO3 Class Builder</p>
        </div>

        <nav className="bo3-menu">
          <NavLink to="/" end className="bo3-link">
            HOME
          </NavLink>
          <NavLink to="/weapons" className="bo3-link">
            ARMAS
          </NavLink>
          <NavLink to="/maps" className="bo3-link">
            MAPAS
          </NavLink>
          <NavLink to="/specialists" className="bo3-link">
            ESPECIALISTAS
          </NavLink>
          <NavLink to="/scorestreaks" className="bo3-link">
            RACHAS
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/create-class" className="bo3-link">
                CREAR CLASE
              </NavLink>
              <NavLink to="/my-classes" className="bo3-link">
                MIS CLASES
              </NavLink>
            </>
          )}

          {!isAuthenticated && (
            <>
              <NavLink to="/login" className="bo3-link">
                LOGIN
              </NavLink>
              <NavLink to="/register" className="bo3-link">
                REGISTRO
              </NavLink>
            </>
          )}

          {user?.role === 'admin' && (
            <NavLink to="/admin" className="bo3-link">
              ADMIN
            </NavLink>
          )}
        </nav>

        <div className="player-panel">
          {isAuthenticated ? (
            <>
              <p className="panel-label">PLAYER</p>
              <p className="panel-user">{user.username}</p>
              <p className="panel-role">{user.role}</p>
              <button className="logout-btn" onClick={logout}>
                CERRAR SESIÓN
              </button>
            </>
          ) : (
            <>
              <p className="panel-label">PLAYER</p>
              <p className="panel-user">Invitado</p>
              <p className="panel-role">Sin iniciar sesión</p>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SidebarMenu;
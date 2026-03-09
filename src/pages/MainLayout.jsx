import { Outlet } from 'react-router-dom';
import SidebarMenu from '../components/layout/SidebarMenu';
import Footer from '../components/layout/Footer';

function MainLayout() {
  return (
    <div className="app-shell">
      <SidebarMenu />
      <div className="app-content">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
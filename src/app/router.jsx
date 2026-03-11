import { createHashRouter } from 'react-router-dom';
import MainLayout from '../pages/MainLayout';
import HomePage from '../pages/HomePage';
import WeaponsPage from '../features/weapons/WeaponsPage';
import MapsPage from '../features/maps/MapsPage';
import CreateClassPage from '../features/classes/CreateClassPage';
import MyClassesPage from '../features/classes/MyClassesPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import AdminPage from '../features/admin/AdminPage';
import ProtectedRoute from '../components/common/ProtectedRoute';
import RoleRoute from '../components/common/RoleRoute';
import SpecialistsPage from '../features/specialists/SpecialistsPage';
import EditClassPage from "../features/classes/EditClassPage";
import ScorestreaksPage from '../features/scorestreaks/ScorestreaksPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'weapons', element: <WeaponsPage /> },
      { path: 'maps', element: <MapsPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'create-class',
        element: (
          <ProtectedRoute>
            <CreateClassPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-classes',
        element: (
          <ProtectedRoute>
            <MyClassesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <RoleRoute role="admin">
            <AdminPage />
          </RoleRoute>
        ),
      },
      { path: 'specialists', element: <SpecialistsPage /> },
      {
        path: "edit-class/:id",
        element: <EditClassPage />
      },
      { path: 'scorestreaks', element: <ScorestreaksPage /> }
    ],
  },
]);
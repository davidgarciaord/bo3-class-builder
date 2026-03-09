import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
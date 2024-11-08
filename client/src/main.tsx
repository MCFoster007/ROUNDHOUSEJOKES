import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';

// import SubmitaJoke from './pages/SubmitaJoke.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/signUp.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <SubmitaJoke />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signUp',
        element: <SignUp />
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

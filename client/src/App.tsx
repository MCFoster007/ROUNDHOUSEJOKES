import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';

function App() {
  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

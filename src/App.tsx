import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="bg-gray-100 mx-auto flex min-h-screen max-w-[768px] flex-col justify-between p-4">
      <Outlet />
      <NavBar />
    </div>
  );
}

export default App;

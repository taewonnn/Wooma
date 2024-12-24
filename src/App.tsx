import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="max-w-[768px] mx-auto p-4 min-h-screen flex flex-col justify-between bg-gray-100">
      <Outlet />
      <Footer />
    </div>
  );
}

import { Outlet, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '.';
import { useEffect } from 'react';
import Footer from './components/footer/Footer';

export default function PublicApp() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/signIn');
    }
  }, []);

  return (
    <div className="max-w-[768px] mx-auto p-4 min-h-screen flex flex-col justify-between bg-gray-100">
      <Outlet />
      <Footer />
    </div>
  );
}

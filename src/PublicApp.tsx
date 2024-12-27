import { Outlet, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '.';
import { useEffect } from 'react';
import Footer from './components/common/footer/Footer';

function PublicApp() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/signIn');
    }
  }, []);

  return (
    <div className="bg-gray-100 mx-auto flex min-h-screen max-w-[768px] flex-col justify-between p-4">
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicApp;

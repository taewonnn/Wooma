import { Outlet, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '.';
import { useEffect } from 'react';

export default function PublicApp() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/signIn');
    }
  }, []);

  return (
    <div className="max-w-[768px] mx-auto p-4 min-h-screen flex flex-col justify-between bg-gray-100">
      <p className="bg-red-500">Login Please</p>
      <Outlet />
    </div>
  );
}

import { Outlet, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '.';
import { useEffect } from 'react';

function PublicApp() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn()) {
  //     navigate('/signIn');
  //   }
  // }, []);

  return (
    <div>
      <p className="bg-red-500">Login Please</p>
      <Outlet />
    </div>
  );
}

export default PublicApp;

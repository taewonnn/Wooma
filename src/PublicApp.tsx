import { Outlet } from 'react-router-dom';

function PublicApp() {
  return (
    <div>
      <p className="bg-red-500">Login Please</p>
      <Outlet />
    </div>
  );
}

export default PublicApp;

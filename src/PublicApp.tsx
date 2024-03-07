import { Outlet } from 'react-router-dom';

function PublicApp() {
  return (
    <div className="bg-red-500">
      <p>Login Please</p>
      <Outlet />
    </div>
  );
}

export default PublicApp;

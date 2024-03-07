import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="bg-blue-500">
      <p>메인 페이지 - 로그인 O</p>
      <Outlet />
    </div>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-blue-500">
      <p>메인 페이지 - 로그인 O</p>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/common/navBar/NavBar';
import Header from './components/common/Header/Header';
import { useEffect } from 'react';
import { isLoggedIn } from '.';

function App() {
  const navigate = useNavigate();

  // 로그인 여부 확인 후 리다이렉트
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/signin'); // 비로그인 사용자는 로그인 페이지로 이동
    }
  }, [navigate]);

  return (
    <div className="bg-gray-100 mx-auto flex h-screen max-w-[1280px] flex-col md:flex-row">
      {/* Sidebar: Header + NavBar */}
      <aside className="hidden flex-col bg-purple-500 md:flex md:h-full md:w-[160px]">
        {/* Header */}
        <header className="flex h-14 w-full items-center justify-center bg-purple-600 text-white">
          <Header />
        </header>

        {/* NavBar */}
        <nav className="flex-grow bg-purple-500">
          <NavBar />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-4 pb-16">
        <Outlet />
      </main>

      {/* NavBar for Mobile */}
      <nav className="fixed bottom-0 left-0 w-full bg-purple-500 p-2 text-white md:hidden">
        <NavBar isMobile />
      </nav>
    </div>
  );
}

export default App;

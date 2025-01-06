import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './components/common/footer/Footer';
import { isLoggedIn } from './utils/isLogin';

function PublicApp() {
  const navigate = useNavigate();

  // 로그인 여부 확인 후 리다이렉트
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/feed'); // 로그인한 사용자는 /feed로 리다이렉트
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="bg-gray-100 mx-auto flex h-screen max-w-[1280px] flex-col">
      {/* Main Content */}
      <main className="mx-auto w-full max-w-lg flex-grow overflow-y-auto p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-4 text-white">
        <Footer />
      </footer>
    </div>
  );
}

export default PublicApp;

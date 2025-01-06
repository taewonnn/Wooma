import { useNavigate, useLocation } from 'react-router-dom';
import { navMenus } from '../../../constants';

interface INavBarProps {
  isMobile?: boolean;
}

function NavBar({ isMobile = false }: INavBarProps) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보를 가져옴

  const onClickPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const page = event.currentTarget.textContent?.toLowerCase();
    if (page) {
      navigate(`/${page}`); // 해당 페이지로 이동
    }
  };

  return (
    <div
      className={`flex ${
        isMobile ? 'flex-row justify-around' : 'flex-col items-start'
      } gap-2 p-2 text-white`}
    >
      {navMenus.map(navMenu => {
        // 현재 URL과 메뉴 이름을 비교하여 색상을 결정
        const isActive = location.pathname === `/${navMenu.toLowerCase()}`;

        return (
          <button
            key={navMenu}
            onClick={onClickPage}
            className={`rounded-md px-3 py-2 text-sm ${
              isActive ? 'bg-purple-900' : ''
            } hover:bg-purple-600 ${isMobile ? 'flex flex-col items-center' : 'w-full text-left'}`}
          >
            {navMenu}
          </button>
        );
      })}
    </div>
  );
}

export default NavBar;

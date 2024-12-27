import { useNavigate } from 'react-router-dom';
import { navMenus } from '../../../constants';

interface INavBarProps {
  isMobile?: boolean;
}

function NavBar({ isMobile = false }: INavBarProps) {
  const navigate = useNavigate();

  const onClickPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const page = event.currentTarget.textContent?.toLowerCase();
    navigate(`/${page}`);
  };

  return (
    <div
      className={`flex ${
        isMobile ? 'flex-row justify-around' : 'flex-col items-start'
      } gap-2 p-2 text-white`}
    >
      {navMenus.map(navMenu => (
        <button
          key={navMenu}
          onClick={onClickPage}
          className={`rounded-md px-3 py-2 text-sm hover:bg-purple-700 ${
            isMobile ? 'flex flex-col items-center' : 'w-full text-left'
          }`}
        >
          {navMenu}
        </button>
      ))}
    </div>
  );
}

export default NavBar;

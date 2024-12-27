import { useNavigate } from 'react-router-dom';
import { navMenus } from '../../../constants';

function NavBar() {
  /** useNavigate */
  const navigate = useNavigate();

  /** 클릭 시 페이지 이동 */
  const onClickPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log('클릭한 nav버튼 value: ', event.currentTarget.textContent);
    const page = event.currentTarget.textContent?.toLowerCase();
    navigate(`/${page}`);
  };

  return (
    <div className="fixed bottom-0 left-1/2 mx-auto flex h-14 w-full max-w-[768px] -translate-x-1/2 transform items-center justify-around bg-main p-2 text-white md:justify-between">
      {navMenus.map(navMenu => (
        <button onClick={onClickPage} className="text-sm md:text-base" key={navMenu}>
          {navMenu}
        </button>
      ))}
    </div>
  );
}

export default NavBar;

import { useNavigate } from 'react-router-dom';

function Footer() {
  /** useNavigate */
  const navigate = useNavigate();

  /** 클릭 시 페이지 이동 */
  const onClickPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('클릭한 nav버튼 value: ', event.currentTarget.textContent);
    navigate(`/${event.currentTarget.textContent}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-gray-200">
      <button onClick={onClickPage}>home</button>
      <button onClick={onClickPage}>calendar</button>
      <button onClick={onClickPage}>assets</button>
      <button onClick={onClickPage}>settings</button>
    </div>
  );
}

export default Footer;

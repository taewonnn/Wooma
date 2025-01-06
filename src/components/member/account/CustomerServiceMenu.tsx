import { Link } from 'react-router-dom';
import Img from '../../common/img/Img';
import { AiOutlineNotification, AiOutlineQuestionCircle, AiOutlineComment } from 'react-icons/ai';

function CustomerServiceMenu() {
  const menuItems = [
    { icon: <AiOutlineNotification />, label: '공지사항', to: 'custom-service/notice' },
    { icon: <AiOutlineQuestionCircle />, label: '자주 묻는 질문', to: 'custom-service/faq' },
    { icon: <AiOutlineComment />, label: '1:1 문의', to: 'custom-service/inquiry' },
  ];

  return (
    <div className="py-[10px]">
      <p className="text-999 mb-2 text-sm">고객센터</p>
      {menuItems.map((item, index) => (
        <Link to={item.to} key={index}>
          <div className="flex items-center py-[15px]">
            <Img src={item.icon} alt={item.label} className="mr-3 h-[15px] w-[15px]" />
            <p>{item.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CustomerServiceMenu;

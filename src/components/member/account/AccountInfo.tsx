import { Link } from 'react-router-dom';
import Img from '../../common/img/Img';
import { BsPersonGear, BsReception4 } from 'react-icons/bs';

const menuItems = [
  { icon: <BsPersonGear />, label: '개인정보', to: '/info' },
  { icon: <BsReception4 />, label: '예산설정', to: '/goal' },
];

function AccountInfo() {
  return (
    <section className="py-[10px]">
      <p className="text-999 mb-2 text-sm">개인정보</p>
      {menuItems.map((item, index) => (
        <Link to={item.to} key={index}>
          <div className="flex items-center py-[15px]">
            <Img src={item.icon} alt={item.label} className="mr-3 h-[15px] w-[15px]" />
            <p>{item.label}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default AccountInfo;

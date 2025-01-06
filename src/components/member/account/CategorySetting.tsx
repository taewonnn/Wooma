import { Link } from 'react-router-dom';
import Img from '../../common/img/Img';

import { BsCalendar2Plus, BsCalendarMinus } from 'react-icons/bs';

const menuItems = [
  { icon: <BsCalendar2Plus />, label: '수입 카테고리', to: '/category/income' },
  { icon: <BsCalendarMinus />, label: '지출 카테고리', to: '/category/expense' },
];

function CategorySetting() {
  return (
    <section className="py-[10px]">
      <p className="text-999 mb-2 text-sm">카테고리 설정</p>
      {menuItems.map((item, index) => (
        <Link to={item.to} key={index}>
          <div className="card mb-2 flex items-center rounded-lg bg-white px-3 py-[15px] shadow-lg">
            <Img src={item.icon} alt={item.label} className="mr-3 h-[15px] w-[15px]" />
            <p>{item.label}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default CategorySetting;

import { Link } from 'react-router-dom';
import Img from '../../common/img/Img';

interface ISettingCategory {
  title: string; // 타이틀
  menuItems: {
    icon: React.ReactNode; // 아이콘
    label: string; // 내용
    to: string; // 링크
  }[];
}

function SettingCateogry({ title, menuItems }: ISettingCategory) {
  return (
    <section className="py-[10px]">
      <p className="text-999 mb-2 text-sm">{title}</p>
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

export default SettingCateogry;

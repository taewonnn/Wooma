import { BsPersonGear, BsReception4, BsCalendar2Plus, BsCalendarMinus } from 'react-icons/bs';
import { AiOutlineNotification, AiOutlineQuestionCircle, AiOutlineComment } from 'react-icons/ai';

const MenuCategories = [
  {
    title: '개인정보',
    items: [
      { icon: <BsPersonGear />, label: '개인정보', to: '/info' },
      { icon: <BsReception4 />, label: '예산설정', to: '/goal' },
    ],
  },
  {
    title: '타입',
    items: [
      { icon: <BsCalendar2Plus />, label: '수입 카테고리', to: '/category/income' },
      { icon: <BsCalendarMinus />, label: '지출 카테고리', to: '/category/expense' },
    ],
  },
  {
    title: '고객센터',
    items: [
      { icon: <AiOutlineNotification />, label: '공지사항', to: 'custom-service/notice' },
      { icon: <AiOutlineQuestionCircle />, label: '자주 묻는 질문', to: 'custom-service/faq' },
      { icon: <AiOutlineComment />, label: '1:1 문의', to: 'custom-service/inquiry' },
    ],
  },
];

export default MenuCategories;

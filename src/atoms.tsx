import { atom } from 'recoil';

/** Calendar.tsx - 일자 / 모달 상태 */
export const dateClickedState = atom({
  key: 'dateClickedState',
  default: false,
});

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: '',
});

export const modalCloseState = atom({
  key: 'modalCloseState',
  default: false,
});

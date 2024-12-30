import { create } from 'zustand';

type ModalType = 'alert' | 'confirm' | 'custom';

interface ModalState {
  open: boolean;
  type: ModalType;
  title?: string; // 제목
  message?: string; // 모달 메시지
  customContent?: React.ReactNode; // 커스텀 모달 내용
  onConfirm?: () => void; // 확인 버튼 동작
  onCancel?: () => void; // 취소 버튼 동작
  openModal: (
    type: ModalType,
    options?: {
      title?: string;
      message?: string;
      customContent?: React.ReactNode;
      onConfirm?: () => void;
      onCancel?: () => void;
    },
  ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  open: false,
  type: 'alert',
  title: '',
  message: '',
  customContent: undefined,
  onConfirm: undefined,
  onCancel: undefined,

  // 모달 열기
  openModal: (type, options) =>
    set({
      open: true,
      type,
      ...options,
    }),

  // 모달 닫기
  closeModal: () => set({ open: false }),
}));

import { Modal } from '../../components/common/modal/Modal';
import { useModalStore } from '../../stores/useModalStore';

function GlobalModal() {
  // 모달 상태관리
  const { open, type, title, message, customContent, onConfirm, onCancel, closeModal } =
    useModalStore();

  // 확인 버튼 클릭 함수
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  // 취소 버튼 클릭 함수
  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  return (
    <Modal open={open} closeModal={closeModal}>
      <div className="p-4">
        {title && <h2 className="mb-4 text-lg font-bold">{title}</h2>}

        {/* 타입에 따라 다른 내용 렌더링 */}
        {type === 'alert' && <p>{message}</p>}

        {type === 'confirm' && (
          <>
            <p className="mb-4">{message}</p>
            <div className="flex justify-end gap-2">
              <button
                className="text-gray-700 bg-gray-300 rounded px-4 py-2"
                onClick={handleCancel}
              >
                취소
              </button>
              <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={handleConfirm}>
                확인
              </button>
            </div>
          </>
        )}

        {type === 'custom' && customContent}

        {/* 닫기 버튼 */}
        {!['confirm', 'custom'].includes(type) && (
          <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white" onClick={closeModal}>
            닫기
          </button>
        )}
      </div>
    </Modal>
  );
}

export default GlobalModal;

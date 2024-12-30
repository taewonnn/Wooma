import { Link } from 'react-router-dom';
import { useModalStore } from '../../../stores/useModalStore';
import KakaoMap from '../map/KakaoMap';
import Button from '../button/Button';

function Footer() {
  const { openModal, closeModal } = useModalStore();

  const handleMapClick = () => {
    console.log('지도 클릭!');
    // 카카오맵 열기
    openModal('custom', {
      title: '위치 안내',
      customContent: (
        <div>
          <KakaoMap />
          <Button onClick={closeModal} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
            닫기
          </Button>
        </div>
      ),
    });
  };

  return (
    <footer className="flex justify-center bg-white p-4">
      <div className="w-full max-w-screen-lg text-center text-xs text-gray">
        WOOMA | 대표이사 : OOO | 사업자 등록번호 : XXXX-XXX-XXX-XXXX <br />
        <span className="cursor-pointer underline" onClick={handleMapClick}>
          (06167) 서울특별시 강남구
        </span>
        <br />
        유선 : +82-2-111-1111 | 팩스 : +82-2-123-4567 | E-mail :{' '}
        <Link className="cursor-pointer underline" to="mailto: woomna@woomna.co.kr">
          woomna@wooma.co.kr
        </Link>
        <br />
        Copyright(c) WOOMA. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

import { Link } from 'react-router-dom';

export default function Footer() {
  const handleMapClick = () => {
    console.log('지도 클릭!');
    // 카카오맵 열기
  };

  return (
    <footer className="flex justify-center bg-white p-4">
      <div className="w-full max-w-screen-lg text-center text-xs text-gray">
        WOOMA | 대표이사 : 대표이사 | 사업자 등록번호 : XXXX-XXX-XXX-XXXX <br />
        <span className="cursor-pointer underline" onClick={handleMapClick}>
          (06167) 서울특별시 강남구
        </span>
        <br />
        유선 : +82-2-111-1111 | 팩스 : +82-2-123-4567 | E-mail :{' '}
        <Link className="cursor-pointer underline" to="mailto: partners@rainbow.co.kr">
          woomna@wooma.co.kr
        </Link>
        <br />
        Copyright(c) WOOMA. All rights reserved.
      </div>
    </footer>
  );
}

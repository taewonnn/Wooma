import { useEffect } from 'react';
import { getAccessToken, useKakaoLogin } from '../hooks/KakaoLogin';

export default function LoginCallback() {
  /** 카카오 인가코드 가져오기 */
  const authorizeCode = new URL(window.location.href).searchParams.get('code');
  console.log(authorizeCode);

  const { data } = useKakaoLogin(authorizeCode);
  console.log(data);

  return (
    <>
      <div>아무것도 없어도됨</div>
    </>
  );
}

import { useEffect, useState } from 'react';
import { useGetAccessToken } from '../hooks/useKakaoLogin';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/loading/Loading';

export default function KakaoCallbck() {
  const navigate = useNavigate();
  /** useState - authCode */
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    /** 카카오 인가코드 가져오기 */
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // 카카오에서 받은 인가 코드
    // console.log('url에서 가져오기', code);

    if (code) {
      setAuthCode(code);
      console.log('인가코드', code);
    } else {
      // 토큰 요청이 완료된 후에도 인증 코드가 없으면 이동
      // setTimeout(() => {
      //   navigate('/signin');
      // }, 2000); // 코드가 도착할 시간을 충분히 주기 위해 2초 딜레이
    }
  }, [navigate]);

  // 디버깅용
  useEffect(() => {
    console.log('authCode 상태:', authCode);
  }, [authCode]);

  const { data: tokenData, isLoading: isTokenLoading } = useGetAccessToken(authCode ?? '');
  if (!isTokenLoading && tokenData) {
    console.log('카카오 토큰 데이터:', tokenData);
    alert(tokenData);
  } else if (!tokenData) {
    console.log('토큰 못받아옴');
  }

  return <Loading />;
}

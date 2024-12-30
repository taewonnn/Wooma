import { useEffect, useState } from 'react';
import { useGetKakaoAccessToken } from '../../hooks/useKakaoLogin';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/loading/Loading';

export default function KakaoCallbck() {
  const navigate = useNavigate();
  /** useState - authCode */
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    // 카카오 인가코드 url에서 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // 카카오에서 받은 인가 코드
    // console.log('url에서 가져오기', code);

    if (code) {
      setAuthCode(code);
      console.log('인가코드', code);
    } else {
      // 토큰 요청이 완료된 후에도 인증 코드가 없으면 이동
      setTimeout(() => {
        navigate('/signin');
      }, 2000); // 코드가 도착할 시간을 충분히 주기 위해 2초 딜레이
    }
  }, [navigate]);

  const { data: tokenData, isLoading: isTokenLoading } = useGetKakaoAccessToken(authCode ?? '');

  // 토큰 데이터에 따라 동작 처리
  useEffect(() => {
    if (!isTokenLoading && tokenData) {
      console.log('카카오 토큰 데이터:', tokenData);
      alert(tokenData.access_token); // 디버깅 용도
    }
  }, [isTokenLoading, tokenData]);

  return <Loading />;
}

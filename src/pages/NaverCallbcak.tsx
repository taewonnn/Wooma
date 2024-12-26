import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/loading/Loading';
import { useEffect, useState } from 'react';
import { useGetNaverAccessToken } from '../hooks/useNaverLogin';

export default function NaverCallback() {
  const navigate = useNavigate();

  const [authInfo, setAuthInfo] = useState<{ code: string | null; state: string | null }>({
    code: null,
    state: null,
  });

  useEffect(() => {
    // 네이버 인가코드 / state url에서 가져오기
    const code = new URL(window.location.href).searchParams.get('code');
    const state = new URL(window.location.href).searchParams.get('state');
    // console.log('state', state);
    // console.log('authcode', code);

    // 값 저장
    if (code && state) {
      setAuthInfo({ code, state });
    } else {
      navigate('/signin'); // 값이 없을 경우 로그인 페이지로 이동
    }
  }, []);

  // @todo 인가 코드 서버로 전달

  return <Loading />;
}

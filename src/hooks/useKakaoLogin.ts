import { useQuery } from '@tanstack/react-query';
import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from '../constants/envConfig';
import axios from 'axios';

/**
 * 카카오 회원가입 로직
 * 인가 코드 발급 -> 토큰 발급
 * 토큰 서버 전달
 * 서버에서 받은 데이터로 구분
 */

const getKakaoAccessToken = async (authCode: string) => {
  const res = await axios.post('https://kauth.kakao.com/oauth/token', null, {
    params: {
      grant_type: 'authorization_code',
      client_id: KAKAO_CLIENT_ID, // 카카오 개발자 REST API 키
      redirect_uri: KAKAO_REDIRECT_URI, // 인가 코드를 받은 리다이렉트 URI
      code: authCode, // 카카오에서 발급받은 인가 코드
    },
  });

  // console

  console.log('res', res?.data);

  return res?.data; // access_token, refresh_token 등이 포함된 응답 데이터 반환
};

export const useGetKakaoAccessToken = (authCode: string) => {
  return useQuery({
    queryKey: ['getkakaoAccessToken', authCode],
    queryFn: () => getKakaoAccessToken(authCode),
    enabled: !!authCode, // authCode가 있을 때만 실행되도록 설정
  });
};

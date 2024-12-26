import axios from 'axios';
import { http } from '../utils/http';
import { NAVER_CLIENT_ID, NAVER_SECRET } from '../constants/envConfig';
import { useQueries, useQuery } from '@tanstack/react-query';

/**
 * 네이버 회원가입 로직
 * 인가 코드 발급
 * 인가 코드 서버로 전달
 * 서버에서 받은 데이터로 구분
 */

const getNaverAccessToken = async (authCode: string, state: string) => {
  const res = await http.get('https://nid.naver.com/oauth2.0/token', {
    params: {
      grant_type: 'authorization_code',
      client_id: NAVER_CLIENT_ID,
      client_secret: NAVER_SECRET,
      code: authCode,
      state: state,
    },
  });

  return res?.data;
};

export const useGetNaverAccessToken = (authCode: string, state: string) => {
  return useQuery({
    queryKey: ['getNaverAccessToken', authCode, state],
    queryFn: () => getNaverAccessToken(authCode, state),
    enabled: !!authCode && !!state, // authcode / state 있을 때만 실행
  });
};

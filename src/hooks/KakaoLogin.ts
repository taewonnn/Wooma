import { useQuery } from '@tanstack/react-query';
import { get } from '../utils/api';

const fetchKakaoLogin = async () => {
  const data = await get('https://kauth.kakao.com/oauth/authorize', {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_KAKAO_APP_KEY}`,
    },
  });
  return data;
};

export const useDiary = () => {
  return useQuery({ queryKey: ['kakaoLogin'], queryFn: fetchKakaoLogin });
};

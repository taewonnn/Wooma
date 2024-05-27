import { useQuery } from '@tanstack/react-query';

const getAccessToken = async (authorizeCode: string | null) => {
  const data = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&code=${authorizeCode}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}&grant_type=authorization_code`,
  });

  return await data.json();
};

export const useKakaoLogin = (authorizeCode: string | null) => {
  return useQuery({
    queryKey: ['kakaoLogin', { authorizeCode }],
    queryFn: () => getAccessToken(authorizeCode),
  });
};

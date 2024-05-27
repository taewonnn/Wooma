import { useQuery } from '@tanstack/react-query';
import { post } from '../utils/api';

export const getAccessToken = async (authorizeCode: string | null) => {
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

// {
//   "client_id": "2c42d594fed703978dc1ebe8c961675a",
//   "code": "DAwRdereAIJV6yE3Vr3rWpx1GtobfABMOaQuxLSDiOrYI4ILVAAclAAAAAQKKcleAAABj7opGlLRDLJpR7eCqA",
//   "redirect_uri": "http://127.0.0.1:3000/callback",
//   "grant_type": "authorization_code"
// }:

import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Feed from '../pages/Feed';
import Assets from '../pages/Assets';
import Settings from '../pages/Settings';

import PublicApp from '../PublicApp';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import KakaoCallbck from '../pages/KakaoCallback';
import NaverCallback from '../pages/NaverCallbcak';

/** 로그인 유저 전용 라우터 */
export const authenticatedUserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/feed',
        element: <Feed />,
      },

      {
        path: '/assets',
        element: <Assets />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      // 설정되지 않은 경로일 경우 /feed로 리다이렉트
      {
        path: '*',
        element: <Navigate to="/feed" />,
      },
    ],
  },
]);

/** 로그인하지 않은 유저 전용 라우터 */
export const unauthenticatedUserRouter = createBrowserRouter([
  {
    path: '/',
    element: <PublicApp />,
    children: [
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },

      // 설정되지 않은 경로일 경우 /signin으로 리다이렉트
      {
        path: '*',
        element: <Navigate to="/signin" />,
      },
    ],
  },
  // 카카오 콜백
  {
    path: '/oauth/kakao/callback',
    element: <KakaoCallbck />,
  },
  // 네이버 콜백
  {
    path: '/oauth/naver/callback',
    element: <NaverCallback />,
  },
]);

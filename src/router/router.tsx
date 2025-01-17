import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Feed from '../pages/member/Feed';
import Assets from '../pages/member/Assets';
import Settings from '../pages/member/Settings';

import PublicApp from '../PublicApp';
import SignIn from '../pages/gusest/SignIn';
import SignUp from '../pages/gusest/SignUp';
import KakaoCallbck from '../pages/gusest/KakaoCallback';
import NaverCallback from '../pages/gusest/NaverCallbcak';
import Calendar from '../pages/member/Calendar';
import Charts from '../pages/member/Charts';
import LocalPlusTemp from '../pages/member/localplusTemp';

/** 로그인 유저 전용 라우터 */
export const authenticatedUserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // "/"에 해당히면 true
        element: <Navigate to="/feed" />,
      },
      {
        path: '/feed',
        element: <Feed />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/charts',
        element: <Charts />,
      },
      {
        path: '/local',
        element: <LocalPlusTemp />,
      },
      {
        path: '/assets',
        element: <Assets />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/test',
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
        index: true, // "/"에 해당히면 true
        element: <Navigate to="/signin" />,
      },
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

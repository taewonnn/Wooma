import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Feed from '../pages/Feed';
import Calendar from '../pages/Calendar';
import Assets from '../pages/Assets';
import Settings from '../pages/Settings';

import PublicApp from '../PublicApp';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import LoginCallback from '../pages/LoginCallback';

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
        path: '/calendar',
        element: <Calendar />,
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
        path: '/singup',
        element: <SignUp />,
      },
      {
        path: '/callback',
        element: <LoginCallback />,
      },
      // 설정되지 않은 경로일 경우 /signin으로 리다이렉트
      {
        path: '*',
        element: <Navigate to="/signin" />,
      },
    ],
  },
]);

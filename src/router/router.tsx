import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PublicApp from '../PublicApp';
import Feed from '../pages/Feed';
import Calendar from '../pages/Calendar';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Assets from '../pages/Assets';
import Settings from '../pages/Settings';
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
        path: '/signIn',
        element: <SignIn />,
      },
      {
        path: '/singUp',
        element: <SignUp />,
      },
      {
        path: '/callback',
        element: <LoginCallback />,
      },
    ],
  },
]);

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PublicApp from '../PublicApp';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Info from '../pages/Settings';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Assets from '../pages/Assets';
import Charts from '../pages/Charts';
import Settings from '../pages/Settings';
import Create2 from '../components/calendar/Create2';

/** 로그인 유저 전용 라우터 */
export const authenticatedUserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/asset',
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
        path: '/signin',
        element: <Signin />,
      },
      {
        path: '/singup',
        element: <Signup />,
      },
    ],
  },
]);

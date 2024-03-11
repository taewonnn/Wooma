import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PublicApp from '../PublicApp';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Info from '../pages/Info';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Assets from '../pages/Assets';
import Charts from '../pages/Charts';

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
        children: [
          {
            path: '/calendar/chart',
            element: <Charts />,
          },
        ],
      },
      {
        path: '/asset',
        element: <Assets />,
      },
      {
        path: '/info',
        element: <Info />,
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

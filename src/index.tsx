import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { authenticatedUserRouter, unauthenticatedUserRouter } from './router/router';

/** 로그인 상태 확인 함수 */
const isLoggedIn = () => {
  // 테스트 위해 user 지정
  const user = 1;
  if (user) {
    return true;
  }
  return false;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={isLoggedIn() ? authenticatedUserRouter : unauthenticatedUserRouter} />
  </React.StrictMode>
);

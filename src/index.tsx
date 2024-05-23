import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { authenticatedUserRouter, unauthenticatedUserRouter } from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

/** react-query */
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 캐시 데이터 2분간 유지
    },
  },
});

/** 로그인 상태 확인 함수 */
export const isLoggedIn = () => {
  // 테스트 위해 user 지정
  // const user = 1;

  // 비로그인 시
  const user = false;
  if (user) {
    return true;
  }
  return false;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={true} />
        <RouterProvider
          router={isLoggedIn() ? authenticatedUserRouter : unauthenticatedUserRouter}
        />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

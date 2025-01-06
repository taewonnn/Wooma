import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import './index.css';
import { authenticatedUserRouter, unauthenticatedUserRouter } from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants/envConfig';
import GlobalModal from './pages/modal/GlobalModal';
import { isLoggedIn } from './utils/isLogin';

/** react-query */
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 캐시 데이터 2분간 유지
    },
  },
});

// 경고 무시 함수 - react router future flag
const originalWarn = console.warn;
console.warn = (message: any, ...args: any[]) => {
  if (typeof message === 'string' && message.includes('React Router Future Flag Warning')) {
    return;
  }
  originalWarn(message, ...args);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={client}>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        <GlobalModal />
        <RouterProvider
          router={isLoggedIn() ? authenticatedUserRouter : unauthenticatedUserRouter}
        />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);

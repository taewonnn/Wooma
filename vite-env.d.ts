/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_APP_KEY: string;
  readonly VITE_KAKAO_REDIRECT: string;
  // 다른 환경 변수를 추가할 수 있습니다.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
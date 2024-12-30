import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import Img from '../common/img/Img';

const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: credentialResponse => {
      console.log('JWT Token:', credentialResponse);
    },
    onError: () => {
      console.error('Login Failed');
    },
  });

  return (
    <button
      onClick={() => googleLogin()}
      className="text-gray-700 flex w-full items-center justify-center rounded-md bg-white p-2 text-sm shadow-md"
    >
      <Img src="guest/google_logo.svg" alt="Google" className="mr-2 h-5 w-5" />
      Google로 시작하기
    </button>
  );
};

export default GoogleLoginButton;

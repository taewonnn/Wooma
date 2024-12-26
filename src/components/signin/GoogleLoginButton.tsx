// components/GoogleLoginButton.tsx
import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleLoginSuccess = (credentialResponse: any) => {
    console.log('JWT Token:', credentialResponse.credential);
  };

  const handleLoginFailure = () => {
    console.error('Login Failed');
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
    </div>
  );
};

export default GoogleLoginButton;

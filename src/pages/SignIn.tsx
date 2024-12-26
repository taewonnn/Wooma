import { useForm } from 'react-hook-form';
import { ISignInForm } from '../types/sign';
import {
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  NAVER_CLIENT_ID,
  NAVER_REDIRECT_URI,
} from '../constants/envConfig';
import Button from '../components/common/button/Button';
import Img from '../components/common/img/Img';
import { v4 as uuidv4 } from 'uuid';

export default function SignIn() {
  /** 카카오 로그인 */
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 이동
  };

  /** 네이버 로그인 */
  const handleNaverLogin = () => {
    const STATE = uuidv4();
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
    sessionStorage.setItem('naver_oauth_state', STATE);

    window.location.href = naverAuthUrl; // 네이버 인증 페이지로 이동
  };

  const { register, handleSubmit } = useForm<ISignInForm>();

  /** validation 끝난 이후 실행되는 함수 */
  const onValid = (data: ISignInForm) => {
    console.log('제출한 데이터 묶음 확인:', data);
  };

  return (
    <>
      <p>Signin Page</p>
      <Img src="logo.svg" />

      <form onSubmit={handleSubmit(onValid)} className="w-full">
        <div className="flex justify-start mt-4 mb-4">
          <label htmlFor="username">아이디: </label>
          <input
            {...register('username', { required: '아이디 입력해주세요' })}
            type="text"
            name="username"
            id="username"
          />
        </div>

        <div className="flex justify-start mt-4 mb-4">
          <label htmlFor="password">비밀번호: </label>
          <input
            {...register('password', { required: '비밀번호 입력해주세요' })}
            type="text"
            name="password"
            id="password"
          />
        </div>

        <button>로그인</button>
        <hr />
      </form>

      <div className="mb-8 flex w-full max-w-xs flex-col gap-4">
        {/** 카카오 */}
        <Button
          className="flex items-center justify-center gap-2 rounded-[12px] bg-kakaoYellow px-5 py-3"
          onClick={handleKakaoLogin}
        >
          <Img src="guest/kakao_logo.svg" alt="kakao" className="h-[20px] w-[20px]" />
          <span className="text-base text-black">카카오로 시작하기</span>
        </Button>

        {/** 네이버 */}
        <Button
          onClick={handleNaverLogin}
          className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-naverGreen px-5 py-3"
        >
          <Img src="guest/naver_logo.svg" alt="naver" className="h-[20px] w-[20px]" />
          <span className="text-base text-white">네이버로 시작하기</span>
        </Button>
        {/** 구글 */}
      </div>
    </>
  );
}

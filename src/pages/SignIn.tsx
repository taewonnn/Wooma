import { useForm } from 'react-hook-form';
import { ISignInForm } from '../types/sign';
// @ts-ignore
import kakaoLogin from '../assets/kakao_login.png';
import { Link } from 'react-router-dom';
import { KAKAO_APP_KEY, KAKAO_REDIRECT_URI } from '../constants/envConfig';

function SignIn() {
  const { register, handleSubmit } = useForm<ISignInForm>();
  // console.log(watch());

  /** validation 끝난 이후 실행되는 함수 */
  const onValid = (data: ISignInForm) => {
    console.log('제출한 데이터 묶음 확인:', data);
  };

  return (
    <>
      <p>Signin Page</p>

      <form onSubmit={handleSubmit(onValid)} className="flex justify-center">
        <div className="flex justify-start mt-4 mb-4">
          <label htmlFor="username">username: </label>
          <input
            {...register('username', { required: '아이디 입력해주세요' })}
            type="text"
            name="username"
            id="username"
          />
        </div>

        <div className="flex justify-start mt-4 mb-4">
          <label htmlFor="password">password: </label>
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
      <Link
        className="flex justify-center"
        to={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_APP_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`}
      >
        <img src={kakaoLogin} alt="kakao login" />
      </Link>
    </>
  );
}

export default SignIn;

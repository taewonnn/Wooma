import { useForm } from 'react-hook-form';
import { ISignInForm } from '../types/sign';

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

      <form onSubmit={handleSubmit(onValid)}>
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
      <button>카카오 로그인</button>
    </>
  );
}

export default SignIn;

import { useForm } from 'react-hook-form';
import { IForm } from '../types/sign';

function Signup() {
  /** useForm */
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  console.log('Input에 입력한 값 확인 :', watch());
  console.log('check: ', setError);

  /** validation이 끝난 뒤 실행 함수 */
  const onValid = (data: IForm) => {
    console.log('제출한 데이터 묶음 확인:', data);
    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', { message: 'password are not the same' }, { shouldFocus: true });
    }
  };

  return (
    <>
      <p>Signup Page</p>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col ">
        <div className="flex justify-start mt-4 mb-4">
          <label htmlFor="email">email :</label>
          <input
            {...register('email', {
              required: 'Please Write Email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please write valid email format',
              },
            })}
            type="text"
            placeholder="email"
            name="email"
            id="email"
          />
        </div>
        <span className="text-red-500">{errors?.email?.message}</span>

        <div className="flex justify-start mb-4">
          <label htmlFor="username">username :</label>
          <input
            {...register('username', {
              required: 'Please Write username',
              pattern: {
                value: /^[a-zA-Z]{3,20}$/,
                message:
                  'Username must be 3-20 characters long and can only include upper and lower case letters',
              },
            })}
            type="text"
            placeholder="username"
            name="username"
            id="username"
          />
        </div>
        <span className="text-red-500">{errors?.username?.message}</span>

        <div className="flex justify-start mb-4">
          <label htmlFor="password">password :</label>
          <input
            {...register('password', { required: 'Please Write password' })}
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />
        </div>

        <div className="flex justify-start mb-4">
          <label htmlFor="passwordConfirm">passwordConfirm :</label>
          <input
            {...register('passwordConfirm', { required: 'Please Write passwordConfirm' })}
            type="password"
            placeholder="passwordConfirm"
            name="passwordConfirm"
            id="passwordConfirm"
          />
        </div>

        <button>가입</button>
      </form>
    </>
  );
}

export default Signup;

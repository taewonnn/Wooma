import { useForm } from 'react-hook-form';

function Signup() {
  /** hook-form */
  const { register, watch } = useForm();
  console.log('Input에 입력한 값 확인 :', watch());

  return (
    <>
      <p>Signup Page</p>
      <form action="" className="flex flex-col ">
        <div className="flex justify-start mt-4 mb-4">
          <label htmlFor="email">email :</label>
          <input
            {...register('email', {
              required: 'Please Write Email',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                message: 'Only naver.com emails allowed',
              },
            })}
            type="text"
            placeholder="email"
            name="email"
            id="email"
          />
        </div>

        <div className="flex justify-start mb-4">
          <label htmlFor="username">username :</label>
          <input
            {...register('username', { required: 'Please Write username' })}
            type="text"
            placeholder="username"
            name="username"
            id="username"
          />
        </div>

        <div className="flex justify-start mb-4">
          <label htmlFor="password">password :</label>
          <input
            {...register('password', { required: 'Please Write password' })}
            type="text"
            placeholder="password"
            name="password"
            id="password"
          />
        </div>

        <div className="flex justify-start mb-4">
          <label htmlFor="passwordConfirm">passwordConfirm :</label>
          <input
            {...register('passwordConfirm', { required: 'Please Write passwordConfirm' })}
            type="text"
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

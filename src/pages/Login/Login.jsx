import { FcGoogle } from 'react-icons/fc';

import { loginUser } from '../../entities/user/model/loginUser';

import cl from './Login.module.css';

export const Login = () => {
  return (
    <div className={cl.loginWrapper}>
      <div onClick={loginUser} className={cl.login}>
        <p>Login via Google</p>
        <FcGoogle className={cl.googleIcon} />
      </div>
    </div>
  );
};

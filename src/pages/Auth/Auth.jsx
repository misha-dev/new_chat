import { FcGoogle } from 'react-icons/fc';

import { loginUser } from '@/entities/user/model/loginUser';
import { toast } from 'react-toastify';
import cl from './Auth.module.css';

export const Auth = () => {
  const login = async () => {
    try {
      await loginUser();
    } catch {
      toast.error('Error while login!');
    }
  };
  return (
    <div className={cl.loginWrapper}>
      <div onClick={login} className={cl.login}>
        <p>Login via Google</p>
        <FcGoogle className={cl.googleIcon} />
      </div>
    </div>
  );
};

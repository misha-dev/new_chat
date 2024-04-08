import { auth } from '@/shared/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useAuth = () => {
  const [user] = useAuthState(auth);
  return user;
};

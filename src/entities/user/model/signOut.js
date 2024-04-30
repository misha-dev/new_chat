import { signOut as signOutGoogle } from 'firebase/auth';
import { auth } from '../../../shared/firebase/config';

export const signOut = async (user) => {
  await signOutGoogle(auth);
};

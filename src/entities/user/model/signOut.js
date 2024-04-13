import { signOut as signOutGoogle } from 'firebase/auth';
import { auth } from '../../../shared/firebase/config';
import { setUserOnline } from './setUserOnline';

export const signOut = async (user) => {
  await signOutGoogle(auth);
  await setUserOnline(user.uid, false);
};

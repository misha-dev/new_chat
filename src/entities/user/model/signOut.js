import { auth, firestore } from '../../../shared/firebase/config';

export const signOut = (user) => {
  auth.signOut();
  firestore.collection('users').doc(user.uid).update({ online: false });
};

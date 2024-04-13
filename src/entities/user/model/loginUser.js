import { auth, firestore } from '@/shared/firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const loginUser = async () => {
  const googleProvider = new GoogleAuthProvider();

  const { user } = await signInWithPopup(auth, googleProvider);

  await setDoc(doc(firestore, 'users', user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    online: true,
  });
};

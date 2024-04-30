import { databases } from '@/shared/constants/database';
import { auth, firestore } from '@/shared/firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const loginUser = async () => {
  const googleProvider = new GoogleAuthProvider();

  const { user } = await signInWithPopup(auth, googleProvider);

  const userDocRef = doc(firestore, databases.users, user.uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    await setDoc(userDocRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      friends: [],
    });
  }
};

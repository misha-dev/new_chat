import { auth, firestore } from '@/shared/firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const loginUser = async () => {
  const googleProvider = new GoogleAuthProvider();

  const { user } = await signInWithPopup(auth, googleProvider);

  const userDocRef = doc(firestore, 'users', user.uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    await updateDoc(userDocRef, {
      online: true,
    });
  } else {
    await setDoc(userDocRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      online: true,
      friends: [],
    });
    await setDoc(doc(firestore, 'userchats', user.uid), {
      chats: [],
    });
  }
};

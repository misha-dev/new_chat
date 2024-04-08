import { auth, firebase, firestore } from '@/shared/firebase/config';

export const loginUser = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const { user } = await auth.signInWithPopup(googleProvider);

  firestore.collection('users').doc(user.uid).set({
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    online: true,
  });
};

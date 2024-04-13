import { auth } from '@/shared/firebase/config';
import { FirebaseContext } from '@/shared/firebase/context';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const AppFirebaseContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return <FirebaseContext.Provider value={{ currentUser }}>{children}</FirebaseContext.Provider>;
};

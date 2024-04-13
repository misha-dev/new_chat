import { auth } from '@/shared/firebase/config';
import { FirebaseContext } from '@/shared/firebase/context';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const AppFirebaseContext = ({ children }) => {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setLogged(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return <FirebaseContext.Provider value={{ logged }}>{children}</FirebaseContext.Provider>;
};

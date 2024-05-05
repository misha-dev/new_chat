import { auth } from '@/shared/firebase/config';
import { FirebaseContext } from '@/shared/firebase/context';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const AppFirebaseContext = ({ children }) => {
  const [checkedAuth, setCheckedAuth] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setCheckedAuth(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <FirebaseContext.Provider value={{ checkedAuth }}>{children}</FirebaseContext.Provider>;
};

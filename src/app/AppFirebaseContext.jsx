import { auth } from '@/shared/firebase/config';
import { FirebaseContext } from '@/shared/firebase/context';
import { useEffect, useState } from 'react';

export const AppFirebaseContext = ({ children }) => {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(() => {
      setLogged(true);
      unsub();
    });
  }, []);
  return <FirebaseContext.Provider value={{ logged }}>{children}</FirebaseContext.Provider>;
};

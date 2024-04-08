import { useEffect, useState } from 'react';

import { FirebaseContext } from '../context/FirebaseContext';
import { auth } from '../shared/firebase/config';

export const AppFirebaseContext = ({ children }) => {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setLogged(true);
      unsub();
    });
  }, []);
  return <FirebaseContext.Provider value={{ logged }}>{children}</FirebaseContext.Provider>;
};

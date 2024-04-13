import { setUserOnline } from '@/entities/user/model/setUserOnline';
import { auth } from '@/shared/firebase/config';
import { FirebaseContext } from '@/shared/firebase/context';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const AppFirebaseContext = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLogged(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const setUserOfflineOnBeforeUnload = () => {
      if (currentUser) {
        setUserOnline(currentUser.uid, false);
      }
    };

    window.addEventListener('beforeunload', setUserOfflineOnBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', setUserOfflineOnBeforeUnload);
    };
  }, [currentUser]);

  return <FirebaseContext.Provider value={{ logged }}>{children}</FirebaseContext.Provider>;
};

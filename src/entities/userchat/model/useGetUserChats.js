import { firestore } from '@/shared/firebase/config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useGetUserChats = (userCurrent) => {
  const [chats, setChats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const unSub = onSnapshot(
      doc(firestore, 'userchats', userCurrent.uid),
      async (res) => {
        try {
          setIsLoading(true);
          const items = res.data().chats;

          const promises = items.map(async (item) => {
            const userDocRef = doc(firestore, 'users', item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            const user = userDocSnap.data();

            return { ...item, user };
          });

          const chatData = await Promise.all(promises);

          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
          setIsLoading(false);
        } catch (e) {
          setError(e);
        }
      },
      (error) => {
        setError(error);
      }
    );

    return () => {
      unSub();
    };
  }, [userCurrent.uid]);

  return [chats, isLoading, error];
};

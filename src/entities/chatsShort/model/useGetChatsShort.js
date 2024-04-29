import { databases } from '@/shared/constants/database';
import { firestore } from '@/shared/firebase/config';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

export const useGetChatsShort = (userCurrent) => {
  const firstLoad = useRef(true);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const q = query(collection(firestore, databases.chatsShort), where('participants', 'array-contains', userCurrent.uid));
    const unSub = onSnapshot(
      q,
      async (res) => {
        try {
          if (firstLoad.current) {
            setIsLoading(true);
            firstLoad.current = false;
          }
          const items = res.docs;

          const promises = items.map(async (item) => {
            const itemData = item.data();
            const receiverId = itemData.participants[0] === userCurrent.uid ? itemData.participants[1] : itemData.participants[0];
            const userDocRef = doc(firestore, databases.users, receiverId);
            const userDocSnap = await getDoc(userDocRef);

            const user = userDocSnap.data();
            return { ...itemData, id: item.id, user };
          });

          const chatData = await Promise.all(promises);

          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt) || []);
        } catch (e) {
          console.log(e);
          setError(e);
        } finally {
          setIsLoading(false);
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

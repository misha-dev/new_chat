import { firestore } from '@/shared/firebase/config';
import { updateDoc } from 'firebase/firestore';

export const setUserOnline = async (uid, online) => {
  await updateDoc(firestore, 'users', uid, {
    online,
  });
};

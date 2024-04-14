import { firestore } from '@/shared/firebase/config';
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export const useGetChats = (userCurrent) => {
  const q = doc(firestore, 'userchats', userCurrent.uid);
  return useDocumentData(q);
};

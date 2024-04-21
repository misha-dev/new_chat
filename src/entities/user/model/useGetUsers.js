import { useCollectionData } from 'react-firebase-hooks/firestore';

import { databases } from '@/shared/constants/database';
import { collection, query, where } from 'firebase/firestore';
import { firestore } from '../../../shared/firebase/config';

export const useGetUsers = (userCurrent) => {
  const q = query(collection(firestore, databases.users), where('uid', '!=', userCurrent.uid));
  return useCollectionData(q);
};

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { firestore } from '../../../shared/firebase/config';

export const useGetFriends = (userCurrent) => {
  return useCollectionData(firestore.collection('users').where('uid', '!=', userCurrent.uid));
};

import { firestore } from '@/shared/firebase/config';
import { hashDialogueId } from '@/shared/utils/hashDialogueId';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const useGetMessages = (userCurrent, userDialogue) => {
  const hashId = hashDialogueId(userCurrent.uid, userDialogue.uid);
  const q = query(collection(firestore, 'messages'), where('users', 'array-contains', userCurrent.uid), where('access', '==', hashId), orderBy('createdAt'));
  return useCollectionData(q);
};

import { firestore } from '@/shared/firebase/config';
import { hashDialogueId } from '@/shared/utils/hashDialogueId';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const useGetMessages = (userCurrent, userDialogue) => {
  const hashId = hashDialogueId(userCurrent.uid, userDialogue.uid);
  return useCollectionData(firestore.collection('messages').where('users', 'array-contains', userCurrent.uid).where('access', '==', hashId).orderBy('createdAt'));
};

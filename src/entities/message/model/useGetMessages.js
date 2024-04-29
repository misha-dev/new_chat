import { databases } from '@/shared/constants/database';
import { firestore } from '@/shared/firebase/config';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

export const useGetMessages = (userDialogue) => {
  const [chatFull, loading] = useDocument(doc(firestore, databases.chatsFull, userDialogue.idChatFull));
  const chatFullData = chatFull?.data();

  let messages = [];

  if (!loading && chatFullData) {
    messages = chatFullData.messages;
  }

  return [messages, loading];
};

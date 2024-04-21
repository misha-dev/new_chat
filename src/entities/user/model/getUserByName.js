import { databases } from '@/shared/constants/database';
import { firestore } from '@/shared/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getUserByName = async (name, currentUser) => {
  const q = query(collection(firestore, databases.users), where('displayName', '>=', name.toUpperCase()), where('displayName', '!=', currentUser.displayName));
  const docsSnapshot = await getDocs(q);
  let userBestMatch = null;
  if (!docsSnapshot.empty) {
    userBestMatch = docsSnapshot.docs.find((doc) => doc.data().displayName.toLowerCase().includes(name.toLocaleLowerCase()) && doc.data().friends.findIndex((el) => el === currentUser.uid) === -1);
  } else {
    userBestMatch = null;
  }
  return userBestMatch?.data() || null;
};

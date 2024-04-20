import { firestore } from '@/shared/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getUserByName = async (name) => {
  const q = query(collection(firestore, 'users'), where('displayName', '>=', name.toUpperCase()));
  const docsSnapshot = await getDocs(q);
  console.log(docsSnapshot.docs)
  let userBestMatch = null;
  if (!docsSnapshot.empty) {
    userBestMatch = docsSnapshot.docs.find((doc) => doc.data().displayName.toLowerCase().includes(name.toLocaleLowerCase()));
  } else {
    userBestMatch = null;
  }
  return userBestMatch?.data() || null;
};

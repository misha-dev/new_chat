import { useEffect, useState } from 'react';

import { firestore } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';

import { BlankDialogue } from './BlankDialogue/BlankDialogue';
import cl from './Chat.module.css';
import { Dialogue } from './Dialogue/Dialogue';
import { Users } from './Users/Users';

export const Chat = () => {
  const userCurrent = useAuth();
  const [userActiveDialogue, setUserActiveDialogue] = useState(null);
  useEffect(() => {
    const user = firestore.collection('users').doc(userCurrent.uid);
    const setUserStatus = (online) => {
      user.update({ online });
    };

    setUserStatus(true);

    return () => {
      setUserStatus(false);
    };
  }, [userCurrent.uid]);

  return (
    <div className={cl.chatWrapper}>
      <Users setUserActiveDialogue={setUserActiveDialogue} userCurrent={userCurrent} />
      <div className={cl.dialogueArea}>{userActiveDialogue !== null ? <Dialogue userCurrent={userCurrent} userActiveDialogue={userActiveDialogue} /> : <BlankDialogue />}</div>
    </div>
  );
};

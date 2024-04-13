import { useState } from 'react';

import { useAuth } from '@/entities/user/model/useAuth';
import { BlankDialogue } from './BlankDialogue/BlankDialogue';
import cl from './Chat.module.css';
import { Dialogue } from './Dialogue/Dialogue';
import { Users } from './Users/Users';

export const Chat = () => {
  const userCurrent = useAuth();
  const [userActiveDialogue, setUserActiveDialogue] = useState(null);

  return (
    <div className={cl.chatWrapper}>
      <Users setUserActiveDialogue={setUserActiveDialogue} userCurrent={userCurrent} />
      <div className={cl.dialogueArea}>{userActiveDialogue !== null ? <Dialogue userCurrent={userCurrent} userActiveDialogue={userActiveDialogue} /> : <BlankDialogue />}</div>
    </div>
  );
};

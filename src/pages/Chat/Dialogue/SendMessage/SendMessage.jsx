import firebase from 'firebase';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { IoMdSend } from 'react-icons/io';

import { firestore } from '@/shared/firebase/config';
import { hashDialogueId } from '@/shared/utils/hashDialogueId';
import { scrollBars } from '@/shared/utils/useScrollbar';
import cl from './SendMessage.module.css';

export const SendMessage = ({ userCurrent, userActiveDialogue }) => {
  const [message, setMessage] = useState('');
  const inputMessageArea = useRef();
  const sendMessage = () => {
    if (message.trim() === '') {
      setMessage('');
      return;
    }

    firestore.collection('messages').add({
      access: hashDialogueId(userCurrent.uid, userActiveDialogue.uid),
      uid: userCurrent.uid,
      toUser: userActiveDialogue.uid,
      users: [userCurrent.uid, userActiveDialogue.uid],
      displayName: userCurrent.displayName,
      photoURL: userCurrent.photoURL,
      message: message.trim(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    inputMessageArea?.current?.focus();

    setMessage('');
  };
  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (!isMobile) {
      inputMessageArea?.current?.focus();
    }
  });

  return (
    <div className={cl.sendMessageWrapper}>
      <textarea
        onFocus={() => {
          if (isMobile) {
            setTimeout(() => {
              scrollBars?.scroll([0, '100%'], 70);
            }, 500);
          }
        }}
        ref={inputMessageArea}
        autoComplete="off"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={handleKeyEnter}
        className={cl.message}
        placeholder="Enter a message"
      ></textarea>

      <div onClick={sendMessage} className={cl.sendMessage}>
        <IoMdSend className={cl.sendIcon} />
      </div>
    </div>
  );
};

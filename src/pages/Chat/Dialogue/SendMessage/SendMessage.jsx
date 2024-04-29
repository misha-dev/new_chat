import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { IoMdSend } from 'react-icons/io';

import { databases } from '@/shared/constants/database';
import { firestore } from '@/shared/firebase/config';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { MdEmojiEmotions } from 'react-icons/md';
import cl from './SendMessage.module.css';

export const SendMessage = ({ userCurrent, userActiveDialogue }) => {
  const [message, setMessage] = useState('');
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const inputMessageArea = useRef();
  const [currentCursorPosition, setCurrentCursorPosition] = useState(null);
  const onEmojiClickEvent = ({ native }) => {
    const ref = inputMessageArea.current;
    setMessage((prev) => {
      const start = prev.substring(0, ref.selectionStart);
      const end = prev.substring(ref.selectionStart);
      setCurrentCursorPosition(ref.selectionStart + native.length);
      return `${start}${native}${end}`;
    });
  };

  useEffect(() => {
    inputMessageArea.current.selectionEnd = currentCursorPosition;
  }, [currentCursorPosition]);

  const sendMessage = async () => {
    if (message.trim() === '') {
      setMessage('');
      return;
    }
    const currentTime = Date.now();

    const updateChatsFull = updateDoc(doc(firestore, databases.chatsFull, userActiveDialogue.idChatFull), {
      messages: arrayUnion({
        senderId: userCurrent.uid,
        text: message,
        createdAt: currentTime,
      }),
    });
    const updateChatsShort = updateDoc(doc(firestore, databases.chatsShort, userActiveDialogue.id), {
      lastMessage: message,
      updatedAt: currentTime,
    });

    await Promise.all([updateChatsFull, updateChatsShort]);

    setMessage('');

    inputMessageArea?.current?.focus();
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
      <div className={cl.emojiContainer}>
        <div className={cl.emojiPicker}>{isOpenEmojiPicker ? <Picker theme="light" data={data} onEmojiSelect={onEmojiClickEvent} /> : null}</div>
        <button
          type="button"
          onClick={() => {
            setIsOpenEmojiPicker(!isOpenEmojiPicker);
          }}
        >
          <MdEmojiEmotions fill="#2F70D2" className={cl.emojiPickerButton} />
        </button>
      </div>
      <textarea
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

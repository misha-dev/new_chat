import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { IoIosAttach, IoMdSend } from 'react-icons/io';

import { databases } from '@/shared/constants/database';
import { firestore } from '@/shared/firebase/config';
import { upload } from '@/shared/firebase/upload';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { MdEmojiEmotions } from 'react-icons/md';
import { toast } from 'react-toastify';
import cl from './SendMessage.module.css';

export const SendMessage = ({ userCurrent, userActiveDialogue }) => {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
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
    if (!sendingMessage) {
      try {
        setSendingMessage(true);
        const updateChatsFull = updateDoc(doc(firestore, databases.chatsFull, userActiveDialogue.idChatFull), {
          messages: arrayUnion({
            senderId: userCurrent.uid,
            text: message,
            img: null,
            createdAt: currentTime,
          }),
        });
        const updateChatsShort = updateDoc(doc(firestore, databases.chatsShort, userActiveDialogue.id), {
          lastMessage: message,
          updatedAt: currentTime,
        });

        await Promise.all([updateChatsFull, updateChatsShort]);
      } catch {
        toast.error('Error while sending!');
      } finally {
        setSendingMessage(false);
      }

      setMessage('');

      inputMessageArea?.current?.focus();
    }
  };
  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleImg = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = await upload(file);
      const currentTime = Date.now();
      if (!sendingMessage) {
        try {
          setSendingMessage(true);
          const updateChatsFull = updateDoc(doc(firestore, databases.chatsFull, userActiveDialogue.idChatFull), {
            messages: arrayUnion({
              senderId: userCurrent.uid,
              text: null,
              img: imgUrl,
              createdAt: currentTime,
            }),
          });
          const updateChatsShort = updateDoc(doc(firestore, databases.chatsShort, userActiveDialogue.id), {
            lastMessage: '[image]',
            updatedAt: currentTime,
          });

          await Promise.all([updateChatsFull, updateChatsShort]);
        } catch {
          toast.error('Error while sending!');
        } finally {
          setSendingMessage(false);
        }
      }
    }
  };

  useEffect(() => {
    if (!isMobile) {
      inputMessageArea?.current?.focus();
    }
  });

  return (
    <div className={cl.sendMessageWrapper}>
      <div className={`${cl.emojiContainer} ${sendingMessage ? cl.sendingMessage : ''}`}>
        <div className={cl.emojiPicker}>{isOpenEmojiPicker ? <Picker theme="light" data={data} onEmojiSelect={onEmojiClickEvent} /> : null}</div>
        <button
          type="button"
          onClick={() => {
            if (!sendingMessage) {
              setIsOpenEmojiPicker(!isOpenEmojiPicker);
            }
          }}
        >
          <MdEmojiEmotions fill="#2F70D2" className={cl.emojiPickerButton} />
        </button>
      </div>
      <label>
        <IoIosAttach fill="#2F70D2" className={`${cl.imgPicker} ${sendingMessage ? cl.sendingMessage : ''}`} />
        <input disabled={sendingMessage} onChange={handleImg} type="file" accept="image/png, image/jpeg" style={{ display: 'none' }} />
      </label>
      <textarea
        ref={inputMessageArea}
        autoComplete="off"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={handleKeyEnter}
        disabled={sendingMessage}
        className={`${cl.message} ${sendingMessage ? cl.sendingMessage : ''}`}
        placeholder="Enter a message"
      ></textarea>

      <button onClick={sendMessage} className={`${cl.sendMessage}  ${sendingMessage ? cl.sendingMessage : ''}`}>
        <IoMdSend className={cl.sendIcon} />
      </button>
    </div>
  );
};

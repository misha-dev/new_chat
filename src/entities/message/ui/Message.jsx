import { toDateTime } from '@/shared/utils/toDateTime';
import cl from './Message.module.css';

export const Message = ({ userCurrent, userActiveDialogue, message }) => {
  const currentUserMessage = userCurrent.uid === message.senderId;
  const messageText = message.text;
  const messageImg = message.img;

  const dateCreation = toDateTime(message.createdAt);

  return (
    <div className={cl.messageWrapper} style={{ justifyContent: currentUserMessage ? 'flex-end' : 'flex-start' }}>
      {currentUserMessage ? (
        <>
          <div className={`${cl.message} ${cl.messageRight}`}>
            {messageText ? messageText : <img className={cl.messageImg} src={messageImg} alt="photo" />}
            <div className={`${cl.dateCreation} ${cl.dateCreationRight}`}>{dateCreation}</div>
          </div>
          <img className={cl.avatar} style={{ marginLeft: '5px' }} src={userCurrent.photoURL} alt="avatar" />
        </>
      ) : (
        <>
          <img className={cl.avatar} style={{ marginRight: '5px' }} src={userActiveDialogue.user.photoURL} alt="avatar" />
          <div className={`${cl.message} ${cl.messageLeft}`}>
            {messageText ? messageText : <img className={cl.messageImg} src={messageImg} alt="photo" />}
            <div className={`${cl.dateCreation} ${cl.dateCreationLeft}`}>{dateCreation}</div>
          </div>
        </>
      )}
    </div>
  );
};

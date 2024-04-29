import { toDateTime } from '@/shared/utils/toDateTime';
import cl from './Message.module.css';

export const Message = ({ userCurrent, userActiveDialogue, message }) => {
  const currentUserMessage = userCurrent.uid === message.senderId;
  const messageContent = message.text;

  const dateCreation = toDateTime(message.createdAt);

  return (
    <div className={cl.messageWrapper} style={{ justifyContent: currentUserMessage ? 'flex-end' : 'flex-start' }}>
      {currentUserMessage ? (
        <>
          <div className={`${cl.message} ${cl.messageRight}`}>
            {messageContent}
            <div className={`${cl.dateCreation} ${cl.dateCreationRight}`}>{dateCreation}</div>
          </div>
          <img style={{ marginLeft: '5px' }} src={userCurrent.photoURL} alt="avatar" />
        </>
      ) : (
        <>
          <img style={{ marginRight: '5px' }} src={userActiveDialogue.user.photoURL} alt="avatar" />
          <div className={`${cl.message} ${cl.messageLeft}`}>
            {messageContent}
            <div className={`${cl.dateCreation} ${cl.dateCreationLeft}`}>{dateCreation}</div>
          </div>
        </>
      )}
    </div>
  );
};

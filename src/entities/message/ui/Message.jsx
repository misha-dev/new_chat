import { toDateTime } from '../../../shared/utils/toDateTime';

import cl from './Message.module.css';

export const Message = ({ userCurrent, uid, userActiveDialogue, message }) => {
  const currentUserMessage = userCurrent.uid === uid;

  const dateCreation = toDateTime(message.createdAt.toDate());

  return (
    <div className={cl.messageWrapper} style={{ justifyContent: currentUserMessage ? 'flex-end' : 'flex-start' }}>
      {currentUserMessage ? (
        <>
          <div className={`${cl.message} ${cl.messageRight}`}>
            {message}
            <div className={`${cl.dateCreation} ${cl.dateCreationRight}`}>{dateCreation}</div>
          </div>
          <img style={{ marginLeft: '5px' }} src={userCurrent.photoURL} alt="avatar" />
        </>
      ) : (
        <>
          <img style={{ marginRight: '5px' }} src={userActiveDialogue.photoURL} alt="avatar" />
          <div className={`${cl.message} ${cl.messageLeft}`}>
            {message}
            <div className={`${cl.dateCreation} ${cl.dateCreationLeft}`}>{dateCreation}</div>
          </div>
        </>
      )}
    </div>
  );
};

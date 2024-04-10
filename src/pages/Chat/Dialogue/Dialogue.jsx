import { useRef } from 'react';

import { useGetMessages } from '@/entities/message/model/useGetMessages';
import { Message } from '@/entities/message/ui/Message';
import { LoaderMessages } from '@/shared/components/Loaders/LoaderMessages/LoaderMessages';
import { useScrollbar } from '@/shared/utils/useScrollbar';
import cl from './Dialogue.module.css';
import { EmptyDialogue } from './EmptyDialogue/EmptyDialogue';
import { SendMessage } from './SendMessage/SendMessage';

export const Dialogue = ({ userCurrent, userActiveDialogue }) => {
  const messagesForScrollbar = useRef(null);
  const [messages, messagesLoading] = useGetMessages(userCurrent, userActiveDialogue);

  const toScroll = messages?.length > 1;

  useScrollbar(messagesForScrollbar, toScroll);

  return (
    <div className={cl.dialogueWrapper}>
      <div className={cl.messagesWrapper}>
        <div className={cl.companionName}>{userActiveDialogue.displayName}</div>
        {messagesLoading ? (
          <LoaderMessages />
        ) : messages.length === 0 ? (
          <EmptyDialogue />
        ) : (
          <div className={cl.messageWrapperForScroll}>
            {messages.map((message, id) => {
              return <Message key={id} message={message} uid={message.uid} userCurrent={userCurrent} userActiveDialogue={userActiveDialogue} />;
            })}
          </div>
        )}
      </div>

      <SendMessage userActiveDialogue={userActiveDialogue} userCurrent={userCurrent} />
    </div>
  );
};

import { useEffect, useRef } from 'react';

import { useGetMessages } from '@/entities/message/model/useGetMessages';
import { Message } from '@/entities/message/ui/Message';
import { LoaderMessages } from '@/shared/components/Loaders/LoaderMessages/LoaderMessages';
import { scrollBars, useScrollbar } from '@/shared/utils/useScrollbar';
import cl from './Dialogue.module.css';
import { EmptyDialogue } from './EmptyDialogue/EmptyDialogue';
import { SendMessage } from './SendMessage/SendMessage';

export const Dialogue = ({ userCurrent, userActiveDialogue }) => {
  const messagesForScrollbar = useRef(null);
  const innerBlockForScroll = useRef(null);
  const [messages, messagesLoading] = useGetMessages(userCurrent, userActiveDialogue);

  const toScroll = messages?.length > 1;

  useScrollbar(messagesForScrollbar, toScroll);
  // Solved problem with rendering of message from another user
  useEffect(() => {
    scrollBars?.scroll([0, '100%'], 70);
  });

  return (
    <div className={cl.dialogueWrapper}>
      <div className={cl.messagesWrapper}>
        <div className={cl.companionName}>{userActiveDialogue.displayName}</div>
        {messagesLoading ? (
          <LoaderMessages />
        ) : messages.length === 0 ? (
          <EmptyDialogue />
        ) : (
          <div ref={messagesForScrollbar} className={cl.messageWrapperForScroll}>
            <div ref={innerBlockForScroll}>
              {messages.map((message) => {
                return <Message key={message.uid} message={message} uid={message.uid} userCurrent={userCurrent} userActiveDialogue={userActiveDialogue} />;
              })}
            </div>
          </div>
        )}
      </div>

      <SendMessage userActiveDialogue={userActiveDialogue} userCurrent={userCurrent} />
    </div>
  );
};

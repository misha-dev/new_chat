import { useGetChatsShort } from '@/entities/chatsShort/model/useGetChatsShort';
import { CreateChatButton } from '@/features/chat';
import { LoaderUsers } from '@/shared/components/Loaders/LoaderUsers/LoaderUsers';
import { SearchInput } from '@/shared/components/SearchInput/SearchInput';
import { useCallback, useState } from 'react';
import cl from './Users.module.css';

export const Users = ({ userCurrent, userActiveDialogue, setUserActiveDialogue }) => {
  const [chatsShort, loading, error] = useGetChatsShort(userCurrent);
  const [searchedChat, setSearchedChat] = useState('');

  const onChangeSearchInputSideEffect = useCallback((text) => setSearchedChat(text), []);

  const filteredChats = chatsShort.filter((chat) => chat.user.displayName.toLowerCase().includes(searchedChat.toLowerCase()));

  return (
    <div className={cl.usersWrapper}>
      <div className={cl.chatOptions}>
        <SearchInput disabled={loading} containerClassName={cl.search} onChangeSideEffect={onChangeSearchInputSideEffect} />
        <CreateChatButton />
      </div>
      {loading ? (
        <LoaderUsers />
      ) : filteredChats.length !== 0 ? (
        <div className={cl.usersList}>
          {filteredChats.map((chat) => {
            return (
              <label key={chat.idChatFull}>
                <input
                  onChange={() => {
                    setUserActiveDialogue(chat);
                  }}
                  type="radio"
                  name="userDialogue"
                  checked={userActiveDialogue?.id === chat.id}
                />

                <div className={cl.userCard}>
                  <div className={cl.wrapperImg}>
                    <img alt="" src={chat.user.photoURL}></img>
                  </div>

                  <div className={cl.infoChat}>
                    <div className={cl.userName}>{chat.user.displayName}</div>
                    {chat.lastMessage ? <div className={cl.lastMessage}>{chat.lastMessage}</div> : null}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      ) : (
        <p className={cl.noChats}>No chats!</p>
      )}
    </div>
  );
};

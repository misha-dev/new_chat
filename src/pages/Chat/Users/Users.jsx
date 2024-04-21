import { useGetChatsShort } from '@/entities/chatsShort/model/useGetChatsShort';
import { CreateChatButton } from '@/features/chat';
import { LoaderUsers } from '@/shared/components/Loaders/LoaderUsers/LoaderUsers';
import { SearchInput } from '@/shared/components/SearchInput/SearchInput';
import { useCallback } from 'react';
import cl from './Users.module.css';

export const Users = ({ userCurrent, setUserActiveDialogue }) => {
  const [chatsShort, loading, error] = useGetChatsShort(userCurrent);

  const onChangeSearchInputSideEffect = useCallback(() => {}, []);

  return (
    <div className={cl.usersWrapper}>
      <div className={cl.chatOptions}>
        <SearchInput containerClassName={cl.search} onChangeSideEffect={onChangeSearchInputSideEffect} />
        <CreateChatButton />
      </div>
      {loading ? (
        <LoaderUsers />
      ) : chatsShort.length !== 0 ? (
        <div className={cl.usersList}>
          {chatsShort.map((chat) => {
            return (
              <label key={chat.idChatFull}>
                <input
                  onChange={() => {
                    setUserActiveDialogue(chat);
                  }}
                  value={chat.idChatFull}
                  type="radio"
                  name="userDialogue"
                />

                <div className={cl.userCard}>
                  <div className={cl.wrapperImg}>
                    <img alt="" src={chat.user.photoURL}></img>
                    <div
                      style={{
                        backgroundColor: chat.user.online ? '#2f70d2' : '#fff',
                      }}
                      className={cl.online}
                    ></div>
                  </div>

                  <div className={cl.userName}>{chat.user.displayName}</div>
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

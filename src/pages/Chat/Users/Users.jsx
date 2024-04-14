import { useGetUserChats } from '@/entities/userchat/model/useGetUserChats';
import { CreateChatButton } from '@/features/chat';
import { LoaderUsers } from '@/shared/components/Loaders/LoaderUsers/LoaderUsers';
import { SearchInput } from '@/shared/components/SearchInput/SearchInput';
import { firestore } from '@/shared/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import cl from './Users.module.css';

export const Users = ({ userCurrent, setUserActiveDialogue }) => {
  const [userchats, loading, error] = useGetUserChats(userCurrent);

  if (!userchats && !loading && !error) {
    setDoc(doc(firestore, 'userchats', userCurrent.uid), {
      chats: [],
    });
  }

  const onChangeSearchInputSideEffect = useCallback(() => {
    console.log('ddd');
  }, []);

  return (
    <div className={cl.usersWrapper}>
      <div className={cl.chatOptions}>
        <SearchInput containerClassName={cl.search} onChangeSideEffect={onChangeSearchInputSideEffect} />
        <CreateChatButton />
      </div>
      {loading ? (
        <LoaderUsers />
      ) : userchats.length !== 0 ? (
        <div className={cl.usersList}>
          {userchats.map((user) => {
            return (
              <label key={user.uid}>
                <input
                  onChange={() => {
                    setUserActiveDialogue(user);
                  }}
                  value={user.uid}
                  type="radio"
                  name="userDialogue"
                />

                <div className={cl.userCard}>
                  <div className={cl.wrapperImg}>
                    <img alt="" src={user.photoURL}></img>
                    <div
                      style={{
                        backgroundColor: user.online ? '#2f70d2' : '#fff',
                      }}
                      className={cl.online}
                    ></div>
                  </div>

                  <div className={cl.userName}>{user.displayName}</div>
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

import { useGetFriends } from '@/entities/user/model/useGetFriends';
import { LoaderUsers } from '@/shared/components/Loaders/LoaderUsers/LoaderUsers';
import { SearchInput } from '@/shared/components/SearchInput/SearchInput';
import { useCallback, useState } from 'react';
import cl from './Users.module.css';

export const Users = ({ userCurrent, setUserActiveDialogue }) => {
  const [users] = useGetFriends(userCurrent);
  const [searchInput, setSearchInput] = useState('');

  const onChangeSearchInputSideEffect = useCallback(() => {
    console.log('ddd');
  }, []);

  return (
    <div className={cl.usersWrapper}>
      <SearchInput containerClassName={cl.search} input={searchInput} setInput={setSearchInput} onChangeSideEffect={onChangeSearchInputSideEffect} />
      {users ? (
        <div className={cl.usersList}>
          {users.map((user) => {
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
        <LoaderUsers />
      )}
    </div>
  );
};

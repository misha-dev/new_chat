import { useRef } from 'react';

import { useGetFriends } from '@/entities/user/model/useGetFriends';
import { LoaderUsers } from '@/shared/components/Loaders/LoaderUsers/LoaderUsers';
import { useScrollbar } from '@/shared/utils/useScrollbar';
import cl from './Users.module.css';

export const Users = ({ userCurrent, setUserActiveDialogue }) => {
  const [users] = useGetFriends(userCurrent);

  const listOfUsersToScroll = useRef();
  useScrollbar(listOfUsersToScroll, users?.length > 1);

  return (
    <div ref={listOfUsersToScroll} className={cl.usersWrapper}>
      {users ? (
        // for scroll to work correctly
        <div>
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

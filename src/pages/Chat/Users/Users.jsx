import { useGetFriends } from '@/entities/user/model/useGetFriends';
import { LoaderUsers } from '@/shared/components/Loaders/LoaderUsers/LoaderUsers';
import cl from './Users.module.css';

export const Users = ({ userCurrent, setUserActiveDialogue }) => {
  const [users] = useGetFriends(userCurrent);

  return (
    <div className={cl.usersWrapper}>
      {users ? (
        <>
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
        </>
      ) : (
        <LoaderUsers />
      )}
    </div>
  );
};

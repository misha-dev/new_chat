import { useEffect, useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';

import { signOut } from '../model/signOut';

import cl from './User.module.css';

export const User = ({ user }) => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const userOptionsClasses = [cl.userOptions];
  useEffect(() => {
    const hideUserOptions = () => {
      setShowUserOptions(false);
    };
    document.addEventListener('click', hideUserOptions);
    return () => {
      document.removeEventListener('click', hideUserOptions);
    };
  }, []);
  if (showUserOptions) {
    userOptionsClasses.push(cl.active);
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowUserOptions(!showUserOptions);
      }}
      className={cl.user}
    >
      <img alt="user" src={user.photoURL} />

      <div className={userOptionsClasses.join(' ')}>
        <div className={cl.option} onClick={signOut}>
          Logout <IoIosLogOut style={{ marginLeft: '5px' }} />
        </div>
      </div>
    </div>
  );
};

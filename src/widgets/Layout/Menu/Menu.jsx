import { Link } from 'react-router-dom';

import { useAuth } from '@/entities/user/model/useAuth';
import { User } from '@/entities/user/ui/User';
import cl from './Menu.module.css';

export const Menu = () => {
  const user = useAuth();
  return (
    <nav>
      <div className={cl.menu}>
        <Link to={'/chatonline'}>
          <p>Chat Online</p>
        </Link>
        <Link to={'/chatonline'}>
          <img className={cl.chatImage} src="/images/chat.png" alt="Chat" />
        </Link>
        {user ? <User user={user} /> : null}
      </div>
    </nav>
  );
};

import { FaPlus } from 'react-icons/fa';

import { useState } from 'react';
import { CreateChatModal } from '../CreateChatModal/CreateChatModal';
import cl from './CreateChatButton.module.css';

export const CreateChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className={cl.addChat}>
        <FaPlus />
      </button>
      <CreateChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

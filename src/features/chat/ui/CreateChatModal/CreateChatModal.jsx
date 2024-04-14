import { ButtonPrimary } from '@/shared/components/ButtonPrimary/ButtonPrimary';
import { CustomInput } from '@/shared/components/CustomInput/CustomInput';
import { Modal } from '@/shared/components/Modal/Modal';
import { firestore } from '@/shared/firebase/config';
import { collection, query, where } from 'firebase/firestore';
import { useState } from 'react';
import cl from './CreateChatModal.module.css';

export const CreateChatModal = ({ isOpen, onClose }) => {
  const [inputUserName, setInputUserName] = useState('');
  const [searchedUsers, SetsearchedUsers] = useState(null);

  const onSearchButtonClick = async (e) => {
    e.preventDefault();
    if (inputUserName.trim().length > 0) {
      const q = query(collection(firestore, 'users'), where('displayName', '>=', inputUserName));
      // const querySnapShot = await  
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <h2 className={cl.header}>Creating chat</h2>
      </Modal.Header>
      <Modal.Body>
        <form className={cl.wrapper}>
          <div className={cl.searchUserWrapper}>
            <CustomInput input={inputUserName} onChange={(e) => setInputUserName(e.target.value)} placeholder="Username" />
            <ButtonPrimary className={cl.searchButton} onClick={onSearchButtonClick}>
              Search
            </ButtonPrimary>
          </div>

          <div className={cl.userCard}>
            <div className={cl.wrapperImg}>
              <img alt="" src={'^'}></img>
            </div>

            <div className={cl.userName}>Misha</div>
            <ButtonPrimary className={cl.createChatButton}>Create chat</ButtonPrimary>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

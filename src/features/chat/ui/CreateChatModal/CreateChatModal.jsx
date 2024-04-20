import { getUserByName } from '@/entities/user/model/getUserByName';
import { ButtonPrimary } from '@/shared/components/ButtonPrimary/ButtonPrimary';
import { CustomInput } from '@/shared/components/CustomInput/CustomInput';
import { Modal } from '@/shared/components/Modal/Modal';
import { useState } from 'react';
import cl from './CreateChatModal.module.css';

export const CreateChatModal = ({ isOpen, onClose }) => {
  const [inputUserName, setInputUserName] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);

  const onSearchButtonClick = async (e) => {
    e.preventDefault();
    if (inputUserName.trim().length > 0) {
      setSearchedUser(await getUserByName(inputUserName));
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

          {searchedUser ? (
            <div className={cl.userCard}>
              <img alt="avatar" src={searchedUser.photoURL}></img>

              <div className={cl.userName}>{searchedUser.displayName}</div>
              <ButtonPrimary className={cl.createChatButton}>Create chat</ButtonPrimary>
            </div>
          ) : null}
        </form>
      </Modal.Body>
    </Modal>
  );
};

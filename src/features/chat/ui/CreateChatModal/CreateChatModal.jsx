import { ButtonPrimary } from '@/shared/components/ButtonPrimary/ButtonPrimary';
import { CustomInput } from '@/shared/components/CustomInput/CustomInput';
import { Modal } from '@/shared/components/Modal/Modal';
import { useState } from 'react';
import cl from './CreateChatModal.module.css';

export const CreateChatModal = ({ isOpen, onClose }) => {
  const [inputUserName, setInputUserName] = useState('');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <h2 className={cl.header}>Creating chat</h2>
      </Modal.Header>
      <Modal.Body>
        <div className={cl.wrapper}>
          <div className={cl.searchUserWrapper}>
            <CustomInput input={inputUserName} onChange={(e) => setInputUserName(e.target.value)} placeholder="Username" />
            <ButtonPrimary className={cl.searchButton}>Search</ButtonPrimary>
          </div>

          <div className={cl.searchedUserList}>
            <div className={cl.userCard}>
              <div className={cl.wrapperImg}>
                <img alt="" src={'^'}></img>
              </div>

              <div className={cl.userName}>Misha</div>
              <ButtonPrimary className={cl.createChatButton}>Create chat</ButtonPrimary>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

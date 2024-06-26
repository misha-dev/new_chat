import { getUserByName } from '@/entities/user/model/getUserByName';
import { useAuth } from '@/entities/user/model/useAuth';
import { ButtonPrimary } from '@/shared/components/ButtonPrimary/ButtonPrimary';
import { CustomInput } from '@/shared/components/CustomInput/CustomInput';
import { Modal } from '@/shared/components/Modal/Modal';
import { databases } from '@/shared/constants/database';
import { firestore } from '@/shared/firebase/config';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import cl from './CreateChatModal.module.css';

export const CreateChatModal = ({ isOpen, onClose }) => {
  const [inputUserName, setInputUserName] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [isFirstSearch, setIsFirstSearch] = useState(false);
  const [loadingCreatingChat, setLoadingCreatingChat] = useState(false);
  const currentUser = useAuth();

  const onCloseModal = () => {
    onClose();
    setInputUserName('');
    setSearchedUser(null);
    setLoadingCreatingChat(false);
    setIsFirstSearch(false);
  };

  const onSearchButtonClick = async (e) => {
    e.preventDefault();
    if (inputUserName.trim().length > 0) {
      setIsFirstSearch(true);
      setSearchedUser(await getUserByName(inputUserName, currentUser));
    }
  };

  const handleAddUser = async () => {
    const chatsShortRef = collection(firestore, databases.chatsShort);
    const chatsFullRef = collection(firestore, databases.chatsFull);
    const currentUserDocRef = doc(firestore, databases.users, currentUser.uid);
    const receiverUserDocRef = doc(firestore, databases.users, searchedUser.uid);
    setLoadingCreatingChat(true);

    await updateDoc(currentUserDocRef, {
      friends: arrayUnion(searchedUser.uid),
    });
    await updateDoc(receiverUserDocRef, {
      friends: arrayUnion(currentUser.uid),
    });

    try {
      const chatFullDocRef = await addDoc(chatsFullRef, {
        messages: [],
        participants: [currentUser.uid, searchedUser.uid],
      });
      await addDoc(chatsShortRef, {
        idChatFull: chatFullDocRef.id,
        updatedAt: new Date(),
        lastMessage: '',
        participants: [currentUser.uid, searchedUser.uid],
      });
      onCloseModal();
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingCreatingChat(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
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
              <ButtonPrimary disabled={loadingCreatingChat} onClick={handleAddUser} className={cl.createChatButton}>
                Create chat
              </ButtonPrimary>
            </div>
          ) : isFirstSearch ? (
            <p className={cl.userNotFound}>User not found!</p>
          ) : null}
        </form>
      </Modal.Body>
    </Modal>
  );
};

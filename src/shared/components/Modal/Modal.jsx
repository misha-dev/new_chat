import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ImCross } from 'react-icons/im';
import cl from './Modal.module.css';

export const Modal = ({ children, isOpen = false, onClose }) => {
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const modal = (
    <div className={cl.modalWrapper}>
      <div className={cl.modalContent}>
        {children}
        <button onClick={onClose} className={cl.buttonClose}>
          <ImCross />
        </button>
      </div>
    </div>
  );

  return createPortal(modal, document.getElementById('modals'));
};

Modal.Header = ({ children }) => {
  return <div className={cl.header}>{children}</div>;
};

Modal.Body = ({ children }) => {
  return <div className={cl.body}>{children}</div>;
};

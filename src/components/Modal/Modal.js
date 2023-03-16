import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Overlay, Modal } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root');

export const ModalWindow = ({ onClose, children }) => { 
  
  useEffect (() => {
    
    const handleKeyDown = e => {
      if(e.code === 'Escape') {
        onClose();
      };
    };

    window.addEventListener('keydown', handleKeyDown);

    return window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]) 

  const handleBackdropClick = e => {
    if(e.currentTarget === e.target) {
      onClose();
    };
  };

  return createPortal (
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <img src={children} alt="" />
      </Modal>
    </Overlay>
  , modalRoot,
    );
};
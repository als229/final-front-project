import React from "react";
import ReactDOM from "react-dom";
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from './Modal.styles';

const Modal = ({ isOpen, onClose, children }) => {

  if( !isOpen) { return null };

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>
          &times;
        </ModalCloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.getElementById("modal-root")
  );
};

export default Modal;

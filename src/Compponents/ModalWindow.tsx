import React from 'react';
import "./ModalWindow";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const UniversalModal: React.FC<ModalProps> = ({ isOpen, onClose, title}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-body"></div>
      </div>
    </div>
  );
};

export default UniversalModal;

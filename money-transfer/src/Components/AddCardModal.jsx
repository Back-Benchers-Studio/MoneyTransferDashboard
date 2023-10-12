/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

function AddCardModal({ isOpen, onRequestClose, onAddCard }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [validThru, setValidThru] = useState('');

  const handleAddCard = () => {
    if (cardNumber && cardHolder && validThru) {
      const newCard = {
        id: Date.now(),
        cardHolder,
        cardNumber,
        validThru,
      };
      onAddCard(newCard);
      setCardNumber('');
      setCardHolder('');
      setValidThru('');
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Card"
      className="modal-content"
    >
      <h2>Add Card</h2>
      <label>Card Number:</label>
      <input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <label>Card Holder:</label>
      <input
        type="text"
        value={cardHolder}
        onChange={(e) => setCardHolder(e.target.value)}
      />
      <label>Valid Thru:</label>
      <input
        type="text"
        value={validThru}
        onChange={(e) => setValidThru(e.target.value)}
      />
      <button onClick={handleAddCard}>Confirm</button>
    </Modal>
  );
}

export default AddCardModal;

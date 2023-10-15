/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import '../Styles/DollarCard.css';

function DollarCard({cardNumber, cardHolder, validThru }) {
  return (
    <div className="dollar-visa-card">
      <div className="card-front">
        <div className="chip"></div>
        <div className="card-number">
          <span> {cardNumber} </span>
        </div>
        <div className="card-info">
          <div className="card-holder">
            <label>Card Holder: </label>
            <span>{cardHolder}</span>
          </div>
          <div className="valid-thru">
            <label>Valid Thru: </label>
            <span>{validThru}</span> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default DollarCard;

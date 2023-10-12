/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import '../Styles/VodafoneCashCard.css';

function Card({mobileNumber, numberHolder}) {
  return (
    <div className="vodafone-card">
      <div className="card-front">
        <div className="chip"></div>
        <div className="Mobile-number">
          <span> {mobileNumber} </span>
        </div>
        <div className="card-info">
          <div className="Number-holder">
            <label>Number Holder: </label>
            <span>{numberHolder}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

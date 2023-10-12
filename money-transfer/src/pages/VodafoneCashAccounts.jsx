/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import VodafoneCashCard from "../Components/VodafoneCashCard";
import "../Styles/BankAccount.css";

function VodafoneCashAccounts() {
  const [vodafoneCards, setvodafoneCardsData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [newTransaction, setNewTransaction] = useState({
    MobileNumber: "",
    amount: "",
    description: "",
  });

  const [newCard, setNewCard] = useState({
    NumberHolder: '',
    MobileNumber: '',
  });



  useEffect(() => {

    const vodafoneCardsData = [
      {
        id: 1,
        NumberHolder: "John Doe",
        MobileNumber: "4512 **** **** 3456",
      },
      {
        id: 2,
        NumberHolder: "Jane Smith",
        MobileNumber: "5123 **** **** 7890",
      },
      {
        id: 3,
        NumberHolder: "Jane Doe",
        MobileNumber: "5123 **** **** 7999",
      },
    ];
    setvodafoneCardsData(vodafoneCardsData);
    
    const mockTransactions = [
      {
        id: 1,
        MobileNumber: "4512 **** **** 3456",
        amount: 100,
        description: "Purchase 1",
      },
      {
        id: 2,
        MobileNumber: "5123 **** **** 7890",
        amount: 50,
        description: "Purchase 2",
      },
      
    ];
    setTransactions(mockTransactions);
  }, []);

  const handleAddTransaction = () => {
    if (
      newTransaction.selectedCard &&
      newTransaction.amount &&
      newTransaction.description
    ) {
      const selectedCardData = vodafoneCards.find(
        (card) => card.MobileNumber === newTransaction.selectedCard
      );
      if (selectedCardData) {
        setTransactions([
          ...transactions,
          {
            MobileNumber: selectedCardData.MobileNumber, 
            amount: newTransaction.amount,
            description: newTransaction.description, 
          },
        ]);
        setNewTransaction({ selectedCard: "", amount: "", description: "" });
      }
    }
  };

  const handleAddCard = () => {
    console.log("Adding a new card...");
    if (newCard.MobileNumber && newCard.NumberHolder) {
      console.log("New card data:", newCard);
      const addedCard = {
        id: vodafoneCards.length + 1,
        numberHolder: newCard.NumberHolder,
        mobileNumber: newCard.MobileNumber,
      };
      console.log("Added card data:", addedCard);
      setvodafoneCardsData([
        ...vodafoneCards,
        {
          id: vodafoneCards.length + 1,
          NumberHolder: newCard.NumberHolder,
          MobileNumber: newCard.MobileNumber,
        }
        ]);
      console.log("vodafone cash cards data after update:", vodafoneCards);
      setNewCard({ MobileNumber: '', NumberHolder: '' });
    }
  };

  return (
    <div>
      <h1>Vodafone Cash Accounts</h1>
      <div className="bank-cards-container">
        {vodafoneCards.map((card) => (
          <VodafoneCashCard
            key={card.id}
            numberHolder={card.NumberHolder}
            mobileNumber={card.MobileNumber}
          />
        ))}
      </div>
      {/* <button onClick={toggleAddCardModal}>Add Card (+)</button> */}
      <div className="add-card-form">
        <h2>Add Card</h2>
        <label>Card Number:</label>
        <input
          type="text"
          value={newCard.MobileNumber}
          onChange={(e) => setNewCard({ ...newCard, MobileNumber: e.target.value })}
        />
        <label>Card Holder:</label>
        <input
          type="text"
          value={newCard.NumberHolder}
          onChange={(e) => setNewCard({ ...newCard, NumberHolder: e.target.value })}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
      <div className="transactions">
        <h2>Transactions</h2>
        <ul style={{ listStyle: "none" }}>
          {transactions.map((transaction, index) => (
            <li key={index}>
              Mobile Number: {transaction.MobileNumber}, Amount:{" "}
              {transaction.amount}, Description: {transaction.description}
            </li>
          ))}
        </ul>
        <div className="transaction-input">
          <select
            value={newTransaction.selectedCard}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                selectedCard: e.target.value,
              })
            }
          >
            <option value="">Select a Card</option>
            {vodafoneCards.map((card) => (
              <option key={card.MobileNumber} value={card.MobileNumber}>
                {card.NumberHolder} - {card.MobileNumber}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, amount: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                description: e.target.value,
              })
            }
          />
          <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
      </div>
      
    </div>
  );
}

export default VodafoneCashAccounts;
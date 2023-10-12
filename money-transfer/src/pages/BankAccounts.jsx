/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import VisaCard from "../Components/Card";
import "../Styles/BankAccount.css";

function BankAccounts() {
  const [bankCards, setBankCardsData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [newTransaction, setNewTransaction] = useState({
    cardNumber: "",
    amount: "",
    description: "",
  });

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    validThru: '',
  });



  useEffect(() => {

    const bankCardsData = [
      {
        id: 1,
        cardHolder: "John Doe",
        cardNumber: "4512 **** **** 3456",
        validThru: "12/25",
      },
      {
        id: 2,
        cardHolder: "Jane Smith",
        cardNumber: "5123 **** **** 7890",
        validThru: "03/26",
      },
      {
        id: 3,
        cardHolder: "Jane Doe",
        cardNumber: "5123 **** **** 7999",
        validThru: "03/26",
      },
    ];
    setBankCardsData(bankCardsData);
    
    const mockTransactions = [
      {
        id: 1,
        cardNumber: "4512 **** **** 3456",
        amount: 100,
        description: "Purchase 1",
      },
      {
        id: 2,
        cardNumber: "5123 **** **** 7890",
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
      const selectedCardData = bankCards.find(
        (card) => card.cardNumber === newTransaction.selectedCard
      );
      if (selectedCardData) {
        setTransactions([
          ...transactions,
          {
            cardNumber: selectedCardData.cardNumber, 
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
    if (newCard.cardNumber && newCard.cardHolder && newCard.validThru) {
      console.log("New card data:", newCard);
      const addedCard = {
        id: bankCards.length + 1,
        cardHolder: newCard.cardHolder,
        cardNumber: newCard.cardNumber,
        validThru: newCard.validThru,
      };
      console.log("Added card data:", addedCard);
      setBankCardsData([
        ...bankCards,
        {
          id: bankCards.length + 1,
          cardHolder: newCard.cardHolder,
          cardNumber: newCard.cardNumber,
          validThru: newCard.validThru,
        }
        ]);
      console.log("Bank cards data after update:", bankCards);
      setNewCard({ cardNumber: '', cardHolder: '', validThru: '' });
    }
  };

  return (
    <div>
      <h1>Bank Accounts</h1>
      <div className="bank-cards-container">
        {bankCards.map((card) => (
          <VisaCard
            key={card.id}
            cardHolder={card.cardHolder}
            cardNumber={card.cardNumber}
            validThru={card.validThru}
          />
        ))}
      </div>
      {/* <button onClick={toggleAddCardModal}>Add Card (+)</button> */}
      <div className="add-card-form">
        <h2>Add Card</h2>
        <label>Card Number:</label>
        <input
          type="text"
          value={newCard.cardNumber}
          onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
        />
        <label>Card Holder:</label>
        <input
          type="text"
          value={newCard.cardHolder}
          onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })}
        />
        <label>Valid Thru:</label>
        <input
          type="text"
          value={newCard.validThru}
          onChange={(e) => setNewCard({ ...newCard, validThru: e.target.value })}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
      <div className="transactions">
        <h2>Transactions</h2>
        <ul style={{ listStyle: "none" }}>
          {transactions.map((transaction, index) => (
            <li key={index}>
              Card Number: {transaction.cardNumber}, Amount:{" "}
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
            {bankCards.map((card) => (
              <option key={card.cardNumber} value={card.cardNumber}>
                {card.cardHolder} - {card.cardNumber}
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

export default BankAccounts;

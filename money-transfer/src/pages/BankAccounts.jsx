/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
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
    cardNumber: "",
    cardHolder: "",
    month: "",
    year: "",
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

  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);

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
        calculateTotalAmount();
      }
    }
  };

  const handleMonthChange = (value) => {
    setNewCard({ ...newCard, month: value });
    if (value.length === 2) {
      yearInputRef.current.focus();
    }
  };

  const handleYearChange = (value) => {
    setNewCard({ ...newCard, year: value });
    if (value === "") {
      monthInputRef.current.focus();
    }
  };

  const handleYearKeyPress = (e) => {
    if (e.key === "Backspace" && newCard.year === "") {
      yearInputRef.current.blur();
      monthInputRef.current.focus();
    }
  };

  const handleAddCard = () => {
    console.log("Adding a new card...");
    if (
      newCard.cardNumber &&
      newCard.cardHolder &&
      newCard.month &&
      newCard.year
    ) {
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
          validThru: newCard.month + "/" + newCard.year,
        },
      ]);
      console.log("Bank cards data after update:", bankCards);
      setNewCard({ cardNumber: "", cardHolder: "", month: "", year: "" });
      yearInputRef.current.blur();
    }
  };

  const calculateTotalAmount = () => {
    const totalAmount = transactions.reduce((total, transaction) => {
      return total + parseInt(transaction.amount);
    }, 0);
    return totalAmount;
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

      <div className="add-card-form">
        <h2>Add Card</h2>
        <label>Card Number:</label>
        <input
          type="text"
          value={newCard.cardNumber}
          maxLength={16}
          onChange={(e) =>
            setNewCard({ ...newCard, cardNumber: e.target.value })
          }
        />
        <label>Card Holder:</label>
        <input
          type="text"
          value={newCard.cardHolder}
          onChange={(e) =>
            setNewCard({ ...newCard, cardHolder: e.target.value })
          }
        />
        <label>Valid Thru:</label>
        <div className="valid-thru-input">
          <input
            ref={monthInputRef}
            type="number"
            placeholder="MM"
            maxLength="2"
            size="2"
            style={{ maxWidth: '30px' }}
            value={newCard.month.substring(0, 2)}
            onChange={(e) => handleMonthChange(e.target.value)}
          />
          <span>/</span>
          <input
            ref={yearInputRef}
            type="number"
            placeholder="YY"
            maxLength="2"
            size="2"
            style={{ maxWidth: '30px' }}
            value={newCard.year.substring(0, 2)}
            onChange={(e) => handleYearChange(e.target.value)}
            onKeyDown={handleYearKeyPress}
          />
        </div>
        <button onClick={handleAddCard}>Add Card</button>
      </div>
      <div className="transactions-container">
        <h2>Transactions</h2>
        <div className="total-section">
          <span>Total: </span>
          <span>{calculateTotalAmount()}</span>
        </div>
        <ul className="transactions-list">
          {transactions.map((transaction, index) => (
            <li key={index} className="transaction-item">
              <div className="transaction-info">
                <span className="transaction-label">Card Number:</span>
                <span className="transaction-value">
                  {transaction.cardNumber}
                </span>
              </div>
              <div className="transaction-info">
                <span className="transaction-label">Amount:</span>
                <span className="transaction-value">{transaction.amount}</span>
              </div>
              <div className="transaction-info">
                <span className="transaction-label">Description:</span>
                <span className="transaction-value">
                  {transaction.description}
                </span>
              </div>
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

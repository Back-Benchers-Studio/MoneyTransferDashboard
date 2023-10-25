/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Card from "../Components/Card";
import "../Styles/BankAccount.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import xlsx from "xlsx";

import { Pagination } from "swiper/modules";

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
      if (!checkCardDuplicate(newCard.cardNumber)) {
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
    }
  };

  const calculateTotalAmount = () => {
    const totalAmount = transactions.reduce((total, transaction) => {
      return total + parseInt(transaction.amount);
    }, 0);
    return totalAmount;
  };

  const checkCardDuplicate = (cardNumber) => {
    if (bankCards.some((card) => card.cardNumber === cardNumber)) {
      toast.error("Card with the same number already exists");
      return true;
    }
    return false;
  };

  return (
    <div>
      <h1>حسابات البنوك</h1>
      <button onClick={() => {
        console.log("test")
        fetch('http://localhost:4000/api/v1/records/export',{method:"GET"}).then(async (res) =>{
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'reports.xlsx';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
      }
         ).catch(err => {
          console.log(err)
         }
          )
      }
        }>تحميل التقرير</button>
      <div className="bank-cards-container">
        <Swiper
          updateOnWindowResize={true}
          slidesPerView={3}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {bankCards.map((card) => (
            <SwiperSlide key={card.id}>
              <Card
                key={card.id}
                cardHolder={card.cardHolder}
                cardNumber={card.cardNumber}
                validThru={card.validThru}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="add-card-form">
        <h2>إضافة كارت</h2>
        <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <label>Card Number:</label>
          <input
            type="number"
            value={newCard.cardNumber}
            maxLength={16}
            onChange={(e) =>{
              const inputVal = e.target.value.replace(/\D/g, "");
              setNewCard({ ...newCard, cardNumber: inputVal.substring(0, 16) })
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
          <label>Card Holder:</label>
          <input
            type="text"
            value={newCard.cardHolder}
            onChange={(e) =>
              setNewCard({ ...newCard, cardHolder: e.target.value })
            }
          />
        </div>
        
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 45,
            marginRight: "85px",
          }}
        >
          <label>Valid Thru:</label>
          <div className="valid-thru-input">
            <input
              ref={monthInputRef}
              type="number"
              placeholder="MM"
              maxLength="2"
              size="2"
              style={{ maxWidth: "30px" }}
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
              style={{ maxWidth: "30px" }}
              value={newCard.year.substring(0, 2)}
              onChange={(e) => handleYearChange(e.target.value)}
              onKeyDown={handleYearKeyPress}
            />
          </div>
        </div>
        <button onClick={handleAddCard}>إضافة</button>
      </div>
      <div className="transactions-container">
        <h2>المعاملات</h2>
        <div className="total-section">
          <span>Total: </span>
          <span>{calculateTotalAmount()}</span>
        </div>
        <ul className="transactions-list">
          <Swiper
            direction="vertical"
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="swiper-container"
          >
            {transactions.map((transaction, index) => (
              <SwiperSlide key={index}>
                <li key={index} className="transaction-item">
                  <div className="transaction-info">
                    <span className="transaction-label">تفاصيل</span>
                    <span className="transaction-value">
                      {transaction.description}
                    </span>
                  </div>
                  <div className="transaction-info">
                    <span className="transaction-label">القيمة</span>
                    <span className="transaction-value">
                      {transaction.amount}
                    </span>
                  </div>
                  <div className="transaction-info">
                    <span className="transaction-label">رقم الكارت</span>
                    <span className="transaction-value">
                      {transaction.cardNumber}
                    </span>
                  </div>
                  
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
        <div className="transaction-input">
        <button onClick={handleAddTransaction}>إضافة العملية</button>
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
          <input
            type="text"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, amount: e.target.value })
            }
          />
          <select
            value={newTransaction.selectedCard}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                selectedCard: e.target.value,
              })
            }
          >
            <option value="">إختر كارت</option>
            {bankCards.map((card) => (
              <option key={card.cardNumber} value={card.cardNumber}>
                {card.cardHolder} - {card.cardNumber}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BankAccounts;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import VodafoneCashCard from "../Components/VodafoneCashCard";
import "../Styles/VodafoneCash.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Pagination } from "swiper/modules";

function VodafoneCashAccounts() {
  const [vodafoneCards, setvodafoneCardsData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [newTransaction, setNewTransaction] = useState({
    MobileNumber: "",
    amount: "",
    description: "",
  });

  const [newCard, setNewCard] = useState({
    NumberHolder: "",
    MobileNumber: "",
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
      {
        id: 3,
        MobileNumber: "01004076442",
        amount: 200,
        description: "Purchase 3",
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
      if (!checkCardDuplicate(newCard.MobileNumber)) {
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
          },
        ]);
        console.log("vodafone cash cards data after update:", vodafoneCards);
        setNewCard({ MobileNumber: "", NumberHolder: "" });
      }
    }
  };

  const calculateTotalAmount = () => {
    const totalAmount = transactions.reduce((total, transaction) => {
      return total + parseInt(transaction.amount);
    }, 0);
    return totalAmount;
  };

  const checkCardDuplicate = (mobileNumber) => {
    if (vodafoneCards.some((card) => card.MobileNumber === mobileNumber)) {
      toast.error("Card with the same number already exists");
      return true;
    }
    return false;
  };

  return (
    <div>
      <h1>حسابات فودافون كاش</h1>
      <div className="bank-cards-container">
        <Swiper
          slidesPerView={3}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {vodafoneCards.map((card) => (
            <SwiperSlide key={card.id}>
              <VodafoneCashCard
                key={card.id}
                numberHolder={card.NumberHolder}
                mobileNumber={card.MobileNumber}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="add-card-form">
        <h2>إضافة رقم</h2>
        <label>رقم الموبايل</label>
        <input
          type="number"
          value={newCard.MobileNumber}
          maxLength={11}
          onChange={(e) => {
            const inputVal = e.target.value.replace(/\D/g, "");
            setNewCard({ ...newCard, MobileNumber: inputVal.substring(0, 11) });
          }}
        />
        <label>صاحب الرقم</label>
        <input
          type="text"
          value={newCard.NumberHolder}
          onChange={(e) =>
            setNewCard({ ...newCard, NumberHolder: e.target.value })
          }
        />
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
                    <span className="transaction-label">رقم الموبايل</span>
                    <span className="transaction-value">
                      {transaction.MobileNumber}
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
            placeholder="تفاصيل"
            value={newTransaction.description}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                description: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="القيمة"
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
            <option value="">إختر رقم</option>
            {vodafoneCards.map((card) => (
              <option key={card.MobileNumber} value={card.MobileNumber}>
                {card.NumberHolder} - {card.MobileNumber}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default VodafoneCashAccounts;

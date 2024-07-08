/* eslint-disable react/prop-types */
// import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react/prop-types
function PaymentDetailsForm({
  onCompletePurchase,
  handleFormChange,
  billingData,
}) {
  // useEffect(() => {
  //   const isValid =
  //     formData.name.trim() !== "" &&
  //     formData.cardNumber.trim() !== "" &&
  //     formData.expiringDate.trim() !== "" &&
  //     formData.cvc.trim() !== "";
  //   setIsFormValid(isValid);
  // }, [formData]);

  function validateForm() {
    let formIsValid = true;

    if (!billingData.card.firstName) {
      formIsValid = false;
      if (!toast.isActive("name-required")) {
        toast.error("first name on card is required", {
          toastId: "name-required",
        });
      }
    }
    if (!billingData.card.secondName) {
      formIsValid = false;
      if (!toast.isActive("name-required")) {
        toast.error("second name on card is required", {
          toastId: "name-required",
        });
      }
    }

    if (!billingData.card.cardNumber) {
      formIsValid = false;
      if (!toast.isActive("cardNumber-required")) {
        toast.error("Card number is required", {
          toastId: "cardNumber-required",
        });
      }
    }
    if (!billingData.card.expiringDate) {
      formIsValid = false;
      if (!toast.isActive("expiringDate-required")) {
        toast.error("Expiring date is required", {
          toastId: "expiringDate-required",
        });
      }
    }
    if (!billingData.card.cvc) {
      formIsValid = false;
      if (!toast.isActive("cvc-required")) {
        toast.error("CVC code is required", {
          toastId: "cvc-required",
        });
      }
    }

    return formIsValid;
  }

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D+/g, "");
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join("-") : value;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    handleFormChange({
      target: {
        name: e.target.name,
        value: formattedValue,
      },
    });
  };

  const formatExpiringDate = (value) => {
    const cleaned = value.replace(/\D+/g, "");
    const match = cleaned.match(/.{1,2}/g);
    return match ? match.join("-").substring(0, 5) : value;
  };

  const handleNumericKeyDown = (e) => {
    const key = e.key;
    if (
      !/^\d$/.test(key) &&
      key !== "Backspace" &&
      key !== "Tab" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  const handleAlphabeticKeyDown = (e) => {
    const key = e.key;
    if (
      !/^[a-zA-Z\s]$/.test(key) &&
      key !== "Backspace" &&
      key !== "Tab" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  const handleExpiringDateChange = (e) => {
    const formattedValue = formatExpiringDate(e.target.value);
    handleFormChange({
      target: {
        name: e.target.name,
        value: formattedValue,
      },
    });
  };

  function handleSubmitPayment(e) {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("paymentFormData", JSON.stringify(billingData));
      onCompletePurchase();
    }
  }

  return (
    <div>
      <ToastContainer autoClose={3000} />

      <h2 className="form-title">Payment Details</h2>
      <form className="checkout-form" onSubmit={handleSubmitPayment}>
        <div className="input-line">
          <label htmlFor="name">Name on card</label>
          <br />
          <input
            type="text"
            name="card.firstName"
            id="firstName"
            placeholder="First Name"
            value={billingData.card.firstName}
            onChange={handleFormChange}
            inputMode="text"
            maxLength="20"
            onKeyDown={handleAlphabeticKeyDown}
          />
          <br />
          <br />
          <input
            type="text"
            name="card.secondName"
            id="secondName"
            placeholder="Second Name"
            value={billingData.card.secondName}
            onChange={handleFormChange}
            inputMode="text"
            maxLength="20"
            onKeyDown={handleAlphabeticKeyDown}
          />
        </div>
        <div className="input-line">
          <label htmlFor="cardNumber">Card number</label>
          <br />
          <input
            type="text"
            name="card.cardNumber"
            id="cardNumber"
            placeholder="1111-2222-3333-4444"
            pattern="\d{4}-\d{4}-\d{4}-\d{4}"
            maxLength="19"
            inputMode="numeric"
            onKeyDown={handleNumericKeyDown}
            value={billingData.card.cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>
        <div className="input-container">
          <div className="input-line">
            <label htmlFor="expiringDate">Expiring Date</label>
            <br />
            <input
              type="text"
              name="card.expiringDate"
              id="expiringDate"
              placeholder="09-21"
              pattern="\d{2}-\d{2}"
              maxLength="5"
              inputMode="numeric"
              onKeyDown={handleNumericKeyDown}
              value={billingData.card.expiringDate}
              onChange={handleExpiringDateChange}
            />
          </div>
          <div className="input-line">
            <label htmlFor="cvc">CVC</label>
            <br />
            <input
              type="text"
              name="card.cvc"
              id="cvc"
              placeholder="***"
              pattern="\d{3}"
              title="Please enter a valid CVC code consisting of 3 digits"
              maxLength="3"
              inputMode="numeric"
              onKeyDown={handleNumericKeyDown}
              value={billingData.card.cvc}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <button value="confirm card" className="purchase-btn">
          Confirm card
        </button>
      </form>
    </div>
  );
}

export default PaymentDetailsForm;

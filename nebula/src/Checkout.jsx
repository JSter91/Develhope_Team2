import React, { useState } from "react";
import "./Checkout.css";
import PaymentDetailsForm from "./PaymentDetailsForms";
import BillingAddressForm from "./BillingAddressForm";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [progressStep, setProgressStep] = useState(1);
  const [billingData, setBillingData] = useState({
    country: "",
    city: "",
    street: "",
    zipcode: "",
  });

  function handleFormChange(e) {
    const { name, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(billingData);
  }

  const handleCompletePurchase = () => {
    setShowBillingAddress(true);
    setProgressStep(2);
  };

  const handleConfirmBillingAddress = () => {
    setShowBillingAddress(false);
    setShowSummary(true);
    setProgressStep(3);
    // console.log("Billing Data:", JSON.stringify(billingData));
  };

  const handleBack = () => {
    if (progressStep > 1) {
      setProgressStep(progressStep - 1);
      if (progressStep === 2) {
        setShowBillingAddress(false);
      } else if (progressStep === 3) {
        setShowSummary(false);
      }
    }
  };

  const navigateHome = useNavigate()
  function backHome(){
    navigateHome("../homepage")
  }

  return (
    <div className="checkoutContainer">
      <div className="headerContainer">
        <div className="menu-icons-container">
          <button className="purchase-btn" onClick={backHome}>home</button>

          <button className="purchase-btn" onClick={handleBack}>
            back
          </button>
        </div>
      </div>

      <div className="progress-checkout-container">
        <div
          className={`progress-step-container ${
            progressStep >= 1 ? "completed" : ""
          }`}
        >
          <div
            className={`step-check ${progressStep >= 1 ? "completed" : ""}`}
          ></div>
          <span className={`step-title ${progressStep === 1 ? "step-title active_check" : ""}`}>Payment</span>
        </div>
        <div
          className={`progress-step-container ${
            progressStep >= 2 ? "completed" : ""
          }`}
        >
          <div
            className={`step-check ${progressStep >= 2 ? "completed" : ""}`}
          ></div>
          <span className={`step-title ${progressStep === 2 ? "step-title active_check" : ""}`}>Information</span>
        </div>
        <div
          className={`progress-step-container ${
            progressStep >= 3 ? "completed" : ""
          }`}
        >
          <div
            className={`step-check ${progressStep >= 3 ? "completed" : ""}`}
          ></div>
          <span className={`step-title ${progressStep === 3 ? "step-title active_check" : ""}`}>Review</span>
        </div>
      </div>

      <div className="form-container">
        {showBillingAddress && !showSummary && (
          <BillingAddressForm
            onConfirmBillingAddress={handleConfirmBillingAddress}
            handleFormChange={handleFormChange}
            billingData={billingData}
            setBillingData={setBillingData}
          />
        )}

        {showSummary && <OrderSummary billingData={billingData} />}

        {!showBillingAddress && !showSummary && (
          <PaymentDetailsForm onCompletePurchase={handleCompletePurchase} />
        )}
      </div>
    </div>
  );
}

export default Checkout;

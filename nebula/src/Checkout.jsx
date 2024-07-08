import { useEffect, useState } from "react";
import "./Checkout.css";
import PaymentDetailsForm from "./PaymentDetailsForms";
import BillingAddressForm from "./BillingAddressForm";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [progressStep, setProgressStep] = useState(1);
  const [billingData, setBillingData] = useState({
    billing: {
      country: "",
      city: "",
      street: "",
      zipcode: "",
    },
    card: {
      firstName: "",
      secondName: "",
      cardNumber: "",
      expiringDate: "",
      cvc: "",
    },
  });

  function handleFormChange(e) {
    const { name, value } = e.target;
    const [section, key] = name.split(".");
    setBillingData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value,
      },
    }));

    console.log(billingData);
  }

  const handleCompletePurchase = () => {
    setProgressStep(3);
  };

  const handleConfirmBillingAddress = () => {
    setProgressStep(2);
  };

  const handleBack = () => {
    if (progressStep === 2 || progressStep === 3) {
      setProgressStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    console.log("updated", progressStep);
  });

  const navigateHome = useNavigate();
  function backHome() {
    navigateHome("../homepage");
  }

  return (
    <div className="checkoutContainer">
      <div className="headerContainer">
        <div className="menu-icons-container">
          <button className="purchase-btn" onClick={backHome}>
            home
          </button>

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
          <span
            className={`step-title ${
              progressStep === 1 ? "step-title active_check" : ""
            }`}
          >
            Information
          </span>
        </div>
        <div
          className={`progress-step-container ${
            progressStep >= 2 ? "completed" : ""
          }`}
        >
          <div
            className={`step-check ${progressStep >= 2 ? "completed" : ""}`}
          ></div>
          <span
            className={`step-title ${
              progressStep === 2 ? "step-title active_check" : ""
            }`}
          >
            Payment
          </span>
        </div>
        <div
          className={`progress-step-container ${
            progressStep >= 3 ? "completed" : ""
          }`}
        >
          <div
            className={`step-check ${progressStep >= 3 ? "completed" : ""}`}
          ></div>
          <span
            className={`step-title ${
              progressStep === 3 ? "step-title active_check" : ""
            }`}
          >
            Review
          </span>
        </div>
      </div>

      <div className="form-container">
        {progressStep === 1 && (
          <BillingAddressForm
            onConfirmBillingAddress={handleConfirmBillingAddress}
            handleFormChange={handleFormChange}
            billingData={billingData}
          />
        )}

        {progressStep === 2 && (
          <PaymentDetailsForm
            onCompletePurchase={handleCompletePurchase}
            handleFormChange={handleFormChange}
            billingData={billingData}
          />
        )}
        {progressStep === 3 && (
          <OrderSummary progressStep={progressStep} billingData={billingData} />
        )}
      </div>
    </div>
  );
}

export default Checkout;

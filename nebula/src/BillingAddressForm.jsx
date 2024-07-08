// import { useState } from "react";

/* eslint-disable react/prop-types */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function BillingAddressForm({
  onConfirmBillingAddress,
  billingData,
  handleFormChange,
}) {
  function validateForm() {
    let formIsValid = true;

    if (!billingData.billing.country) {
      formIsValid = false;
      if (!toast.isActive("country-required")) {
        toast.error("Country is required", {
          toastId: "country-required",
        });
      }
    }
    if (!billingData.billing.city) {
      formIsValid = false;
      if (!toast.isActive("city-required")) {
        toast.error("City is required", {
          toastId: "city-required",
        });
      }
    }
    if (!billingData.billing.street) {
      formIsValid = false;
      if (!toast.isActive("street-required")) {
        toast.error("Street is required", {
          toastId: "street-required",
        });
      }
    }
    if (!billingData.billing.zipcode) {
      formIsValid = false;
      if (!toast.isActive("zipcode-required")) {
        toast.error("Zip code is required", {
          toastId: "zipcode-required",
        });
      }
    }

    return formIsValid;
  }

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

  function confirm(e) {
    e.preventDefault();
    if (validateForm()) {
      onConfirmBillingAddress();
    }
  }
  return (
    <div>
      <ToastContainer autoClose={3000} />
      <h2 className="form-title">Billing Address</h2>
      <form className="checkout-form" onSubmit={confirm}>
        <div className="input-line">
          <label htmlFor="country">Country</label>
          <br />
          <input
            type="text"
            name="billing.country"
            id="country"
            placeholder="Your country"
            inputMode="text"
            onKeyDown={handleAlphabeticKeyDown}
            maxLength="20"
            value={billingData.billing.country}
            onChange={handleFormChange}
          />
        </div>
        <div className="input-line">
          <label htmlFor="city">City</label>
          <br />
          <input
            type="text"
            name="billing.city"
            id="city"
            placeholder="Your city"
            inputMode="text"
            onKeyDown={handleAlphabeticKeyDown}
            maxLength="20"
            value={billingData.billing.city}
            onChange={handleFormChange}
          />
        </div>
        <div className="input-line">
          <label htmlFor="street">Street</label>
          <br />
          <input
            type="text"
            name="billing.street"
            id="street"
            placeholder="Your street"
            maxLength="20"
            value={billingData.billing.street}
            onChange={handleFormChange}
          />
        </div>
        <div className="input-line">
          <label htmlFor="zipcode">Zip Code</label>
          <br />
          <input
            type="text"
            name="billing.zipcode"
            id="zipcode"
            placeholder="Your zip code"
            inputMode="numeric"
            onKeyDown={handleNumericKeyDown}
            maxLength="5"
            value={billingData.billing.zipcode}
            onChange={handleFormChange}
          />
        </div>
        <button className="purchase-btn">Confirm address</button>
      </form>
    </div>
  );
}

export default BillingAddressForm;

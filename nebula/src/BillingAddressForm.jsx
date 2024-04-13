import React, { useState, useEffect } from "react";

const BillingAddressForm = ({
  onConfirmBillingAddress,
  billingData,
  setBillingData,
  handleFormChange,
}) => {

    
  //   Verifica se tutti i campi del modulo sono stati compilati
  useEffect(() => {
    const isValid =
      billingData.country?.trim() !== "" &&
      billingData.city?.trim() !== "" &&
      billingData.street?.trim() !== "" &&
      billingData.zipcode?.trim() !== "";

    // Esegui qui eventuali azioni in base alla validità del modulo
  }, [billingData]);



  function handleFormChange(e) {
    const { name, value } = e.target;
    setBillingData({
      ...billingData,
      [name]: value,
    });
    console.log(billingData);
  }

  return (
    <div>
      <h2 className="form-title">Billing Address</h2>
      <form className="checkout-form">
        <div className="input-line">
          <label htmlFor="country">Country</label>
          <br />
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Your country"
            value={billingData.country}
            onChange={handleFormChange}
          />
        </div>
        <div className="input-line">
          <label htmlFor="city">City</label>
          <br />
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Your city"
            value={billingData.city}
            onChange={handleFormChange}
          />
        </div>
        <div className="input-line">
          <label htmlFor="street">Street</label>
          <br />
          <input
            type="text"
            name="street"
            id="street"
            placeholder="Your street"
            value={billingData.street}
            onChange={handleFormChange}
          />
        </div>
        <div className="input-line">
          <label htmlFor="zipcode">Zip Code</label>
          <br />
          <input
            type="text"
            name="zipcode"
            id="zipcode"
            placeholder="Your zip code"
            value={billingData.zipcode}
            onChange={handleFormChange}
          />
        </div>
        <button
          type="button"
          onClick={onConfirmBillingAddress}
          className="purchase-btn"
        >
          Confirm address
        </button>
      </form>
    </div>
  );
};

export default BillingAddressForm;

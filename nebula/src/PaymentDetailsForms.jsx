import React, { useState, useEffect } from "react";

const PaymentDetailsForm = ({ onCompletePurchase }) => {
    const [formData, setFormData] = useState({
        name: "",
        cardNumber: "",
        expiringDate: "",
        cvc: "",
      });
      const [isFormValid, setIsFormValid] = useState(false);
    
      useEffect(() => {
        // Verifica se tutti i campi del modulo sono stati compilati
        const isValid =
          formData.name.trim() !== "" &&
          formData.cardNumber.trim() !== "" &&
          formData.expiringDate.trim() !== "" &&
          formData.cvc.trim() !== "";
        setIsFormValid(isValid);
      }, [formData]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
      };

      function handleSubmitPayment(e){
        e.preventDefault()
        localStorage.setItem("paymentFormData", JSON.stringify(formData));
        onCompletePurchase();

      }
    
      return (
        <div>
          <h2 className="form-title">Payment Details</h2>
          <form action="" className="checkout-form" onSubmit={handleSubmitPayment} >
            <div className="input-line">
              <label htmlFor="name">Name on card</label>
              <br />
              <input
                required
                type="text"
                name="name"
                id="name"
                title="Please enter your full name"
                placeholder="Your name and surname"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-line">
              <label htmlFor="cardNumber">Card number</label>
              <br />
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder="1111-2222-3333-4444"
                pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                title="Please enter a valid card number in the format: 1111-2222-3333-4444"
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <div className="input-line">
                <label htmlFor="expiringDate">Expiring Date</label>
                <br />
                <input
                  type="text"
                  name="expiringDate"
                  id="expiringDate"
                  placeholder="09-21"
                  pattern="\d{2}-\d{2}"
                  title="Please enter a valid expiring date in the format: MM-YY"
                  value={formData.expiringDate}
                  onChange={handleChange}
                />
              </div>
              <div className="input-line">
                <label htmlFor="cvc">CVC</label>
                <br />
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  placeholder="***"
                  pattern="\d{3}"
                  title="Please enter a valid CVC code consisting of 3 digits"
                  value={formData.cvc}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              value="confirm card"
              className="purchase-btn"
              disabled={!isFormValid}
            >
              Confirm card
            </button>
          </form>
        </div>
      );
    };
    
    export default PaymentDetailsForm;
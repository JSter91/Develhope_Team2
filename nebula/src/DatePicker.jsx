import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import { GlobalContext } from "./GlobalContext";
function MyDatePicker() {

  const {selectedDate, setSelectedDate} = useContext(GlobalContext)
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="date-picker-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
        minDate={new Date()}
      />
      <div className="p-selector">
        {selectedDate && (
          <p >
            You selected: {selectedDate.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default MyDatePicker;

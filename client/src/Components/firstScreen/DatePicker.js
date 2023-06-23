import React, { useState,useContext } from 'react';
import Calendar from 'react-calendar';

import {CityNameContext} from '../../App'

import './datePicker.css'
import 'react-calendar/dist/Calendar.css';

const DateRangePicker = () => {
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  } = useContext(CityNameContext)
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleStartDateChange = (date) => {
    if (date >= new Date()) {
      setFromDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= new Date()) {
      setToDate(date);
    }
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCancel = () => {
    setShowCalendar(false);
  };

  return (
    <div>
      <input
        className='input'
        type="text"
        value={`${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`}
        onClick={handleCalendarToggle}
        readOnly
      />
      {showCalendar && (
        <div className='calendar-box'>
          <Calendar
            onChange={handleStartDateChange}
            value={fromDate}
            minDate={new Date()}
          />
          <Calendar
            onChange={handleEndDateChange}
            value={toDate}
            minDate={new Date()}
          />
          <button onClick={handleCancel}>Back</button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
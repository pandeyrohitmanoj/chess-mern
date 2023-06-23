import React, {useState} from 'react'

import './spinner.css'

export default function SetLoadBookCarMessage({loadBookCarMessage, setLoadBookCarMessage} ) {
  console.log(loadBookCarMessage)
  return (
    <div className='spinner' style={{ display: loadBookCarMessage ? "" : "none"}} > 
      <div className='spinner-text'>
        This is message to notify this is dummy website. No cars booking happens here , i created this website for only purpose of education and display of skills for MERN stack.
        Also if there will be a car booking logic it would be here.
        Instead of it The car will be hidden for the time period in which you selected the car booking if you want to see the car again, adjust the start date in above screen before the time period you booked. Also that car will be added to your history, its visible in you history page of available in sidebar.
        click below button to hide this message and go back to website
        <br/>
      <button className='spinner-text-button' onClick={() => {setLoadBookCarMessage(false)}} > Hide </button>

      </div>
    </div>
      )
}

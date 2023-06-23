import React, { useState, useContext, useEffect} from 'react';
import SetLoadBookCarMessage from '../spinner/SpinnersBookCar';

import getSymbolFromCurrency from 'currency-symbol-map'
import cc from 'currency-codes'

import {CityNameContext} from '../../App'

import {postBookCar,postHistory,} from '../requests'

import './card.css'
import Spinners from '../spinner/Spinners';


const Card = ({ imageURI, make, type, datesAvailability, pricePerHour, selectedFuelType, setLoadBookCarMessage}) => {
  const {fromDate,toDate,selectedCountryName, emailId } = useContext(CityNameContext)
  const [ dates, setDates] = useState(datesAvailability)
  const date = dates.split(',')
  const startAvailable = new Date(date[0])
  const endAvailable = new Date(date[1])
  const [ start, setStart] = useState(new Date(fromDate))
  const [ end, setEnd ] = useState(new Date(toDate))
  const [ countryCode, setCountryCode] = useState('')

  // console.log(startAvailable," ",endAvailable)
  useEffect( () => {
    setStart(new Date(fromDate))
    setEnd(new Date(toDate))
  }, [fromDate,toDate] )


  useEffect( () => {
    let countryName = String(selectedCountryName).toLowerCase()
    setCountryCode(cc.country(countryName)[0].code)
    // console.log(countryCode)
  }, [ ])


  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const bookCar = async ()=>{
    try{
      setLoadBookCarMessage(previous => !previous)
      const start = fromDate.getFullYear()+'-'+(fromDate.getMonth()+1)+"-"+fromDate.getDate()
      const end = toDate.getFullYear()+'-'+(toDate.getMonth()+1)+"-"+toDate.getDate()
      const previousDatesAvailability = start+","+end
      //console.log(previousDatesAvailability)
      const newDatesAvailability = await postBookCar(imageURI,previousDatesAvailability)
      await postHistory( emailId, imageURI, make, previousDatesAvailability )
      setDates(newDatesAvailability)

    } catch(error){
      console.log(error.message)
    }
  }

  return (
    <div className="card" style={{ display: ((type==selectedFuelType || selectedFuelType=='All') && end > startAvailable && endAvailable > start ) ? '' : 'none'}}>
      <img className="card-image" src={imageURI} alt="Car" />
      <h2 className="card-title">{make}</h2>
      <h3 className="card-subtitle">{type}</h3>
      <div className="card-divider"></div>
      <p className="card-text">
        Available From {getFormattedDate(startAvailable)} <br />
      </p>
      <p className='card-car-price' >{getSymbolFromCurrency(countryCode)}{pricePerHour}<span>/hr</span>
      </p>
      <button className="card-button" onClick={bookCar}>Book Now</button>
    </div>
  );
};

export default Card;


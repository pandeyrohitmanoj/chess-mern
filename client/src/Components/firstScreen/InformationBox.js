import React, { useState,useContext, useEffect } from 'react'
import DateRangePicker from './DatePicker';


import { CityNameContext,} from '../../App'

import '../../Styles/InformationBox.css'

const InformationBox = () => {
  const {
    selectedCity,
    setSelectedCity,
    addressState,    
    setAddressState,
    selectedCountryName,
    setGetDataTrigger
  } = useContext(CityNameContext)

  const [ cityElementVisibilty, setCityElementVisibilty ] = useState('none')

  


  const addressStyle = {
    display: cityElementVisibilty
  }

  const handleClick = ( ) => {
    if( cityElementVisibilty == ""){
      setCityElementVisibilty('none')
      return
    }
    setCityElementVisibilty('')
  }
  const scrollDown = () => {
    document.getElementsByClassName('scroll-content')[0].scrollTo('0',window.innerHeight)
  }

  return (
    <div className='lower-box'>
    <div className='infoBox'>        
        <div className='infoBox-address-box' onClick={handleClick} >
          { selectedCity=="" ? "Select a city" : selectedCity }
        </div>
        <DateRangePicker className='startToEndDate'/>
        <div className='button' onClick={scrollDown} >Get Car</div>   
    </div>
    <div className='infoBox-address-box-allCity' style={addressStyle}  >
      { addressState.map( (state, key) => {
        return (
          <div className='infoBox-address-box-allCity-cities' onClick={ () => { setSelectedCity(state);setCityElementVisibilty('none');setGetDataTrigger(previousState => !previousState); }} key={key} >{state}</div>              
          )
      } )}
  </div>
  </div>
  )
}


export default InformationBox
//{"countryName":"India","cityNames":["Delhi","Mumbai","Ahmedabad","Kolkata","Chennai","Bengaluru","Jaipur","Pune","Surat","Hyderabad","Lucknow"]}
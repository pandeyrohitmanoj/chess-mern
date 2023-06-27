import React, { useState, useEffect, useContext } from 'react';
import {Link,} from 'react-router-dom'
import './sidebar.css';

import { getAllCityNames, getAllCountryName} from '../requests'

import getLocalStorage from '../localStorage/GetLocallySavedPassword'


import {CityNameContext} from '../../App'

const Sidebar = () => {
  const { phoneNo,userName,emailId, setCarsData,sideBarToggle,sidebarOpen,setSelectedCity, selectedCountryName, setSelectedCountryName, allCountryName, setAllCountryName, setAddressState, registered, setRegistered,setEmailId, setuserPassword } = useContext(CityNameContext)

  const {removeUserDetail} = getLocalStorage()
  const changeCountry = async (event) => {  
      const allCountryStates = await getAllCityNames(event.target.value)
      const states = allCountryStates[0]["cityNames"]
      setSelectedCountryName(event.target.value)
      setAddressState(states)
      setSelectedCity('')
      setCarsData({})
  }

  useEffect( () => {
    async function fillCountryNames() {
      const response = await getAllCountryName()
      const allCountryStates = await getAllCityNames(selectedCountryName)
      const states = allCountryStates[0]["cityNames"]
      setAddressState(states)
      setAllCountryName(response)
    }
    fillCountryNames()
  }, [])


  const logout = ()=>{
    removeUserDetail()
    setEmailId('') 
    setuserPassword('')
    setRegistered(false)    
  }


  return (
    <div className={`sidebar ${sidebarOpen}`} >
      <div className="profile-info">
        <h2 className="full-name">{userName}</h2>
        <p className="email">{emailId}</p>
        <button className='sidebar-exit-button' onClick={sideBarToggle} >X</button>
        <p className="phone-number">{phoneNo}</p>
      </div>
      <div className="menu-items">
        <ul>
          <li><Link to="/history">My Trips</Link></li>
          <li>
            Select CountryName:
            <select className='sidebar-country-dropbox' onChange={changeCountry}>
              {!selectedCountryName &&<option key='-1' value=''  >Select a country</option>} 
              {allCountryName.map( ( country, key) => {
                return <option key={key} value={country} selected={selectedCountryName==country} >{country}</option>
              })}
            </select>
          </li>
          <li>Help and Support</li>
        </ul>
        <button className="logout-button" onClick={logout} >Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
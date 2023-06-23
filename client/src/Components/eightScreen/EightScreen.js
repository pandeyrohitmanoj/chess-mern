
import React, { useState, useEffect } from 'react'

import './eightScreen.css'

import {getAllCountryAndCitiesName,} from '../requests'

export default function EightScreen() {
    const [ countryNamesDb, setCountryNamesDb ] = useState([])
    
    useEffect( ( ) => {
       async function getCityNames() {
        const data = await getAllCountryAndCitiesName()
        setCountryNamesDb(data)
       }
       getCityNames()
    }, [])

  return (
    <div className='city-names-screen'>
        <div className='city-names-title'>
            We operate in many other cities
        </div>
        <div className='city-names-screen-element'>
            { countryNamesDb.map( (country,key) => {
                return (
                    <div key={key}>
                    <div className='city-names-screen-element-countryName' key={key}>
                        {country.countryName}                        
                    </div>
                    <div className='city-names-screen-element-cityName'>
                        { country.cityNames.map( ( city, key ) => {
                            return <div className='city' key={key} >
                                {city}
                            </div>
                        }  ) }
                    </div>
                    </div>
                )
            } )}
        </div>
    </div>
  )
}

//{"countryName":"Japan","cityNames":["Tokyo","Osaka","Kyoto","Sapporo","Nagoya","Yokohama"]}  {"countryName":"India","cityNames":["Delhi","Mumbai","Ahmedabad","Kolkata","Chennai","Bengaluru","Jaipur","Pune","Surat","Hyderabad","Lucknow"]},{"countryName":"Japan","cityNames":["Tokyo","Osaka","Kyoto","Sapporo","Nagoya","Yokohama"]}
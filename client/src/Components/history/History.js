import React, { useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'

import './history.css'

import {getHistoryData,} from '../requests'

export default function History({emailId}) {
  const [history,setHistory] = useState([])
  

  useEffect( () => {
    async function getHistory(){
      const response = await getHistoryData(emailId)
      setHistory(response.history) 
    }
    getHistory()
   }, [])
  
  return (
  <div className='navigation-history' >
    <div className='navigation-history-title'> History </div>
    <div className='navigation-history-backButton'><Link className='navigation-history-backButton-title' to='/app' >Home</Link></div>
    <div className='navigation-history-cards'>
      {
        history.map( (card,key) => {
          const dates = card.datesAvailability.split(",")
          let from = String(new Date(dates[0])).split(" ")
          let to = String(new Date(dates[1])).split(" ")//`url(${card.imageURI})`
          console.log(from,to)
          return ( 
          <div className='navigation-history-card' key={key} >
            <div className='navigation-history-card-car-image' style={{ backgroundImage: `url(${card.imageURI})` }} ></div> 
            <div className='navigation-history-card-dates' >Rented From {from[2]} {from[1]}  to {to[2]} {to[1]}</div>
            <div className='navigation-history-card-carName' >Car name: {card.car}</div>
          </div>
          )
        })
      }
    </div>
  </div>
  )
}

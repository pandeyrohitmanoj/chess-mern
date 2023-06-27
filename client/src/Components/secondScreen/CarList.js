import React, { useState, useEffect, useContext, useRef} from 'react'
import Card from './Card'

import './carList.css'

import Spinners from '../spinner/Spinners'
import SetLoadBookCarMessage from '../spinner/SpinnersBookCar'

import {CityNameContext,} from '../../App'

import {getCarsData,} from '../requests'

export default function CarList({ selectedFuelType, fieldChange }) {
  const { selectedCity, getDataTrigger,carsData, setCarsData} = useContext(CityNameContext)
  // const [ carsData, setCarsData ] = useState({})
  const [ pageNo, setPageNo ] = useState(1)
  const [ endOfPage, setEndOFPage ] = useState(false)
  const [ loadBookCarMessage, setLoadBookCarMessage ] = useState(false)
  const [ isLoading, setLoading] = useState(false)
  const checkIfGetCar = useRef(null)
  // pageNo,type,cityName
  useEffect( () => {
    setCarsData({})
    
    getCarsData(pageNo,selectedFuelType,selectedCity).then( (result) => {
      const data = result.data
      data.forEach( (value) => {
        const id = value["_id"]
        const data = {}
        data[id] = value
        setCarsData( previousData => {
          const newState  = { ...previousData, ...data}  
          return newState
        } )
      })          
    })
  }, [getDataTrigger] )

  const handleClick = ()=> {
    if(checkIfGetCar.current.innerText != "Click for More Cars"){
      return ;
    }
    setLoading(true)
    setPageNo( pageNo+1 )
    getCarsData(pageNo+1,selectedFuelType,selectedCity).then( (result) => {
      const data = result.data
      setLoading(false) 

      if(data.length==0){
        setEndOFPage(true)
        return
      }
      data.forEach( (value) => {
        const id = value["_id"]
        const data = {}
        data[id] = value
        setCarsData( previousData => {
          const newState  = { ...previousData, ...data}
          return newState
        } )
      })         
    })
  }

  return (
    <div>
      <div className="cards">
      <Spinners isLoading={isLoading} />
      <SetLoadBookCarMessage loadBookCarMessage={loadBookCarMessage} setLoadBookCarMessage={setLoadBookCarMessage} />
        { Object.values(carsData).map( (car,key) => {
          //const { make, ownerName, carPrice, pricePerHour, imageURI, datesAvailability, type } = car
          return <Card {...car} selectedFuelType={selectedFuelType} key={key} loadBookCarMessage={loadBookCarMessage} setLoadBookCarMessage={setLoadBookCarMessage} /> 
        }) }
        
        <div className="card moreCard" ref={checkIfGetCar} onClick={handleClick}>{ (endOfPage || Object.values(carsData).length==0 || Object.values(carsData).length%8 != 0) ? "No More Cars are Available. Please select different Option" : "Click for More Cars" }</div>
      </div>
    </div>
  )
}

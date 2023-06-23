import React, { useState, } from 'react'
import FilterBox from './FilterBox'
import CarList from './CarList'
import CategoryBox from './CategoryBox'

import './secondScreen.css'

export default function SecondScreen() {
  const [ filterValue, setFilterValue ] = useState('All')
  const [ fieldChange, setFieldChange ] = useState(false)

  return (
    <div className='secondScreen' >
        <FilterBox selected = { filterValue } setSelected = { setFilterValue } setFieldChange = {setFieldChange} />
        <CarList selectedFuelType = { filterValue } setSelectedFuelType = { setFilterValue } fieldChange={fieldChange} />
    </div>
  )
}

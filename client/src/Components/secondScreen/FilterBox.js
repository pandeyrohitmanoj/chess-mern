import React, {useState} from 'react'

import './filterBox.css'
import { ReactComponent as All } from '../../Styles/All.svg'
import { ReactComponent as Diesel } from '../../Styles/diesel.svg'
import { ReactComponent as Petrol } from '../../Styles/Petrol.svg'
import { ReactComponent as Electric } from '../../Styles/electric.svg';
export default function FilterBox( { selected, setSelected, setFieldChange }) {
  
  const handleClick= (className)=>{
    setFieldChange(true)
    setSelected(className)
  }

  return (
    <div className='filterBox' >
        <div className='icon'> <All src={All} alt='all photo' onClick={()=>handleClick('All')} className={ selected == 'All' ? 'Icons All selected' : 'Icons All' }/>  All</div>
        <div className='icon' > <Petrol src={Petrol} alt='petrol photo' onClick={()=>handleClick('Petrol')} className={ selected == 'Petrol' ? 'Icons Petrol selected' : 'Icons Petrol' }/> Petrol</div>
        <div className='icon'> <Diesel src={Diesel} alt='Diesel Photo' onClick={()=>handleClick('Diesel')} className={ selected == 'Diesel' ? 'Icons Diesel selected' : 'Icons Diesel' } /> Diesel</div>
        <div className='icon'> <Electric onClick={()=>handleClick('Hybrid')} className={ selected == 'Hybrid' ? "Icons Hybrid selected" : "Icons Hybrid" }/> Hybrid</div>
    </div>
  )
}

/**All, Luxury Car, Road Trip, Automatic Diesel, Sunroof, Cruise Control
 *className={ selected == 'Petrol' ? 'icon selected' : 'icon'} <style>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}
</style>
 * <span class="material-symbols-outlined">
menu
</span>
 <span class="material-symbols-outlined">
local_bar
<span class="material-symbols-outlined">
directions_car
</span>
</span>

*/
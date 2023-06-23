import React, {useState} from 'react'

import './spinner.css'

export default function Spinners({isLoading} ) {
  // console.log(isLoading)
  return (
    <div className='spinner' style={{ display: isLoading ? "" : "none"}} > 
      <div className='loaded' ></div>
    </div>
      )
}

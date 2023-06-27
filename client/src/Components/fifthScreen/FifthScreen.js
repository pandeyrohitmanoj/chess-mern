import React, { useState } from 'react'

import './fifthScreen.css'


export default function FifthScreen() {
  const [ cards, setCards ] = useState(["Enjoy Unlimited kilometers", "ZERO security Deposit", "100% free cancellation before 24hr of trip start", "ZERO Toll Charges", "Reschedule for FREE"])

  return (
    <div className='benifits-carousel-container'>
        <div className='benifits-title'>
            <div className='benifits-upper-title' >Unbelievable Benfits</div>
            <div className='benifits-lower-title' >Drive Everywhere with Freedom</div>
        </div>
        <div className='benifits-outside-carousel-container'>
            <div className='benifts-carousel' >
                {
                    cards.map(( card,key ) => {
                        return(
                            <div className='benifts-cards' style={{backgroundImage:`url(${require(`../../Styles/benifitsImages/${key+1}.png`)})`}} key={key}>
                                <div className='benifts-card-title'>{card}</div>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </div>
  )
}

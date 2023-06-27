import React, { useState } from 'react'

import './sixthScreen.css'


export default function FifthScreen() {
  const [ cards, setCards ] = useState(["Enjoy Unlimited kilometers", "ZERO security Deposit", "100% free cancellation before 24hr of trip start", "ZERO Toll Charges", "Reschedule for FREE"])
  const [ guestInfo, setGuestInfo ] = useState([{
    name:"Arvind",
    location:"Bengaluru",
    comment: "Flattered with availability of well maintained cars"
},{
    name:"Gaurav",
    location:"Delhi",
    comment: "Booked a XUV with unlimited kms, very happy with Zoomcar's service"
},{
    name:"Himanshu",
    location:"Hyderabad",
    comment: "Booked a car for a family trip which was very comfortable and in great condition"
},{
    name:"Krishnan",
    location:"Kerala",
    comment: "Most trustable car rental. Looking forward to using Zoomcar again"
},{
    name:"Lavanya",
    location:"Chennai",
    comment: "Driving on your own is like breath of fresh air. You are in control"
},])
  return (
    <div className='guests-carousel-container'>
        <div className='guests-title'>
        HEAR FROM OUR GUESTS
        </div>
        <div className='guests-outside-carousel-container'>
            <div className='guests-carousel' >
                {
                    cards.map(( card,key ) => {
                        return(
                            <div className='guests-cards' key={key}>
                                <img src={require(`../../Styles/guestsImages/${key+1}.png`)} className='guest-image' />
                                <div className='guests-card-title'>
                                    <div className='guests-card-title-name' >{guestInfo[key]["name"]}, {guestInfo[key]["location"]} </div> 
                                    <div className='guests-card-title-comment' >{guestInfo[key]["comment"]}</div>   
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </div>
  )
}
//style={{backgroundImage:`url(${require(`../../Styles/guestsImages/${key+1}.png`)})`}} 
/* 



*/
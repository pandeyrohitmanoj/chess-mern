import Navigation from "./Navigation"
import UpperText from './UpperText'
import InformationBox from './InformationBox'

import '../../Styles/firstScreen.css'



const FirstScreen = () => {   
    
    const cityName ='mumbai'
    const profileName = 'Rohit'
    const profilePhoto = 'Initiate photo here'
    
    return (        
        <div className="upperComponent" >            
            <Navigation cityname={cityName} profileName={profileName} profilePhoto = {profilePhoto} />
            <UpperText />
            <InformationBox />
        </div>
    )
}

export default FirstScreen


/* fetch citName and full person name and maybe photo of the profile for navbar



*/
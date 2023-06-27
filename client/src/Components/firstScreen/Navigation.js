import { Link } from 'react-router-dom'
import {useContext} from 'react'
import {RxHamburgerMenu} from  'react-icons/rx'
import { findFlagUrlByCountryName } from "country-flags-svg";

import '../../Styles/navigation.css'

import {CityNameContext} from '../../App'

function Navigation(props) {
    const {sideBarToggle,selectedCountryName,userName,} = useContext(CityNameContext)
    const flagUrl = findFlagUrlByCountryName(selectedCountryName);

    return(
        <nav >
            <ul className='upperNavbar'>
                <li><div onClick={sideBarToggle} ><RxHamburgerMenu className="hamburgerIcon"  /></div></li>
                <li><Link><div className='logoIcon'></div></Link></li>
                <li><Link>{userName}</Link></li>
                <li><img src={flagUrl} alt='country-flag' className='upperNavbar-countryFlag-image' style={{display: selectedCountryName=="" ? 'none' : '' }} /></li>
                <li> {selectedCountryName}</li>
            </ul>
        </nav>
    )
}

export default Navigation

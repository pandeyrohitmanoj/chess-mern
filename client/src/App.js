import { useState, createContext, lazy, Suspense, } from 'react'


import './Styles/app.css'


const FirstScreen = lazy( () => import('./Components/firstScreen/FirstScreen') )
const SecondScreen = lazy( () => import('./Components/secondScreen/SecondScreen') )
const ThirdScreen = lazy( () => import('./Components/thirdScreen/ThirdScreen') )
const FourthScreen = lazy( () => import('./Components/fourthScreen/Fourthcreen') )
const FifthScreen = lazy( () => import('./Components/fifthScreen/FifthScreen') )
const SixthScreen = lazy( () => import('./Components/sixthScreen/SixthScreen') )
const SeventhScreen = lazy( () => import('./Components/seventhScreen/SeventhScreen') )
const EightScreen = lazy( () => import('./Components/eightScreen/EightScreen') )
const Sidebar = lazy( () => import('./Components/firstScreen/Sidebar') )


const CityNameContext = createContext()


function App({ selectedOneCity , selectedCountry, phoneNo, userName, emailId, registered, setRegistered, setEmailId, setuserPassword,}) {

  const [ addressState, setAddressState ] = useState([])
  const [ selectedCity , setSelectedCity] = useState(selectedOneCity)
  const [ fromDate, setFromDate ] = useState(new Date())
  const [ toDate, setToDate ] = useState(new Date())
  const [ getDataTrigger, setGetDataTrigger ] = useState(false)
  const [ sidebarOpen, setSidebarOpen ] = useState(false)
  const [ selectedCountryName, setSelectedCountryName ] = useState(selectedCountry)
  const [ allCountryName, setAllCountryName ] = useState([])
  const [ carsData, setCarsData ] = useState({})
  
  const sideBarToggle = () => {
    if(sidebarOpen==""){
      setSidebarOpen('sidebar-open')
      return
    }
    setSidebarOpen('')
  }

  const prop = {
    selectedCity  ,
    setSelectedCity,
    addressState,
    setAddressState,
    fromDate,
    setFromDate,
    toDate,
    setToDate,   
    getDataTrigger, 
    setGetDataTrigger,
    sidebarOpen,
    sideBarToggle,
    selectedCountryName, 
    setSelectedCountryName,
    allCountryName,
    carsData, 
    setCarsData ,
    setAllCountryName,
    phoneNo, userName, emailId,
    selectedCountry,
    selectedCity,
    registered, setRegistered,
    setEmailId, setuserPassword,
  }

 

  return (
    <div className="App" >
      <div className="scroll-content" >
      <CityNameContext.Provider value={ prop } >
        <Sidebar/>
        <FirstScreen  />
        <SecondScreen  />         
      </CityNameContext.Provider>    
      <Suspense fallback={<div>Loading...</div>}  >
        <ThirdScreen />
        <FifthScreen   />
        <FourthScreen   />
        <SixthScreen   />
        <SeventhScreen   />
        <EightScreen  />
      </Suspense>
      </div>
    </div>
  );
}

export default App;

export {CityNameContext}
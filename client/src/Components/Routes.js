import {useState, Suspense} from 'react'

import { Routes, Route, } from 'react-router-dom'

import History from './history/History'
import SignUp from '../Components/signup/SignUp'
import Login  from '../Components/login/Login'
import App from '../App'


function RouteComponent() {
    const [registered, setRegistered] = useState(false)
    const [ addressState, setAddressState ] = useState([])
    const [ selectedOneCity , setSelectedOneCity] = useState('')
    const [ selectedCountry, setSelectedCountry ] = useState('')
    const [ allCountryName, setAllCountryName ] = useState([])
    const [ phoneNo, setPhonNo ] = useState()
    const [ userName, setUserName ] = useState('')
    const [ userPassword, setuserPassword ] = useState('')
    const [ emailId, setEmailId ] = useState('')
    const [ isLoading, setLoading] = useState(false)

    const register = {
        registered, setRegistered,
        addressState, setAddressState,
        selectedOneCity , setSelectedOneCity,
        selectedCountry, setSelectedCountry,
        allCountryName, setAllCountryName ,
        phoneNo, setPhonNo,
        userName, setUserName,
        userPassword, setuserPassword,
        emailId, setEmailId,
        isLoading, setLoading,
    }
    return(
        <Suspense fallback="...Loading">
            <Routes>
                    <Route path='/signup' element={<SignUp {...register} />} />
                    <Route path='/login' element={ <Login {...register}/>} />
                    {/* <Route path='/app' element={<App register />} /> */}
                    <Route path='/app' element={ registered ? <App {...register} /> : <SignUp {...register} />}  />
                    <Route path='/history' element={ registered ? <History emailId={emailId} /> : <SignUp {...register} />}/>
                    <Route path='*' element={<SignUp {...register} />} />
            </Routes>
                </Suspense>
    )
}

export default RouteComponent

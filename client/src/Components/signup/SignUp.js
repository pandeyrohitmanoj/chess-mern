import React, { useEffect, useState, useRef } from 'react';
import {Link,  useNavigate} from 'react-router-dom'

import './signUp.css';

import Spinners from '../spinner/Spinners';

import usePassword from '../localStorage/GetLocallySavedPassword'

import {getAuthenticateProfile } from '../requests' 

import {postProfileForSignUp,} from '../requests'

function SignupForm({ setRegistered, setSelectedOneCity, setSelectedCountry, setPhonNo, setUserName, setEmailId, isLoading, setLoading,   }) {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(true)
  const clickButtonRef = useRef(null)

  const [errorMessage, setErrorMessage ] = useState({
    name:'',
    email:'',
    country:'',
    city:'',
    phone:'',
    password:'',      
  })

  const  { userEmail ,userPassword, setUserDetail} = usePassword()


  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  useEffect( () => {
    const handleKeyPress = ( event ) => {
      const input = event.key
      if(input=="Enter" && enableSubmit){
        if(clickButtonRef.current)
        clickButtonRef.current.click()
      }
    }
    window.addEventListener( 'keydown', handleKeyPress )

    return () => {
      window.removeEventListener( 'keydown', handleKeyPress)
    }
  }, [])

  useEffect( () => {
    async function ifUserIsAuthenticated(){
      //console.log(userEmail ,userPassword)
      if(userEmail && userPassword){
        setLoading(true)
        const response = await getAuthenticateProfile(userEmail,userPassword)
        const {correctPassword, userExist, country, city, phone, userName} = response
        // console.log(correctPassword, userExist, country, city, phone, email, userName)
        if( correctPassword && userExist){
          setRegistered(true)
          setSelectedOneCity(city)
          setSelectedCountry(country)
          setEmailId(usePassword.userEmail)
          setPhonNo(phone)
          setUserName(userName)
          navigate('/app')
        }
      }
      setLoading(false)
    }
    ifUserIsAuthenticated()
  }, [userEmail ,userPassword] )


  useEffect( () => {
    if( name.length!=0 && email.length!=0 && country.length!=0 && city.length!=0 && String(phone).length!=0 && password.length!=0 && errorMessage.name.length==0 && errorMessage.country.length==0 && errorMessage.email.length==0 && errorMessage.phone.length==0 && errorMessage.city.length==0 && errorMessage.password.length==0){
      setEnableSubmit(false)
    } else{
      setEnableSubmit(true)
    }
  }, [errorMessage])

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value);
    if(value=='')
    setErrorMessage( previous => ({ ...previous,name:"Please fill Name" }))
    else
    setErrorMessage( previous => ({ ...previous,name:"" }))
  };

  const handleEmailChange = (e) => {
    const value = e.target.value
    if(!emailRegex.test(value)){
      setErrorMessage( previous => {
        return { ...previous, email:"Incorrect format"}
      } )
    }
    setEmail(value);
    if(value=='')
    setErrorMessage( previous => ({ ...previous,email:"Please fill Email" }))
    else
    setErrorMessage( previous => ({ ...previous,email:"" }))
  };

  const handleCountryChange = (e) => {
    const value=e.target.value
    setCountry(value);
    if(value=='')
    setErrorMessage( previous => ({ ...previous,country:"Please fill Country" }))
    else
    setErrorMessage( previous => ({ ...previous,country:"" }))
  };

  const handleCityChange = (e) => {
    const value = e.target.value
    setCity(value);
    if(value=='')
    setErrorMessage( previous => ({ ...previous,city:"Please fill Country" }))
    else
    setErrorMessage( previous => ({ ...previous,city:"" }))
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value
    setPhone(value);
    if(value=='')
    setErrorMessage( previous => ({ ...previous,phone:"Please fill phone" }))
    else
    setErrorMessage( previous => ({ ...previous,phone:"" }))
  };

  const handlePasswordChange = (e) => {    
    const value = e.target.value
    setPassword(value);

    if(value=='')
    setErrorMessage( previous => ({ ...previous,password:"Please fill Password" }))
    else
    setErrorMessage( previous => ({ ...previous,password:"" }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true)
    await postProfileForSignUp(name,email,password,country,city, phone ).then( response =>{
      //console.log(response)
      if(response.ok==false){
        setErrorMessage( previous => ({ ...previous,email:"Gmail is already taken" }))
        return
      }
      setRegistered(true)
      setSelectedOneCity(city)
      setSelectedCountry(country)
      setPhonNo(phone) 
      setUserName(name) 
      setEmailId(email)
      setUserDetail(email,password)
      setLoading(false)
      navigate('/app')
    })
    setLoading(false)

  };

  return (
    <>
    <div className='signup-contanier' >
      <Spinners isLoading={isLoading} />
        <div className="signup-form">
        <h1 className="signup-form__title">Signup</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="signup-form__label">Name:</label>
            <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="signup-form__input"
            required
            />
            <span className="error-message">{errorMessage.name}</span>
            <label htmlFor="email" className="signup-form__label">Email:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your Gmail address"
            className="signup-form__input"
            required
            />            
            <span className="error-message">{errorMessage.email}</span>
            <label htmlFor="country" className="signup-form__label">Country:</label>
            <input
            type="text"
            id="country"
            value={country}
            onChange={handleCountryChange}
            placeholder="Enter your country"
            className="signup-form__input"
            required
            />
            <span className="error-message">{errorMessage.country}</span>
            
            <label htmlFor="city" className="signup-form__label">City:</label>
            <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter your City Name"
            className="signup-form__input"
            required
            />
            <span className="error-message">{errorMessage.city}</span>

            <label htmlFor="phone" className="signup-form__label">Phone Number:</label>
            <input
            type="text"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number"
            className="signup-form__input"
            required
            />
            <span className="error-message">{errorMessage.phone}</span>

            <label htmlFor="password" className="signup-form__label">Password:</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className="signup-form__input"
            required
            />
            <span className="error-message">{errorMessage.password}</span>

            <button ref={clickButtonRef} type="submit" className="signup-form__button" disabled={enableSubmit} >Signup</button>
        </form>
        <p>Already have account</p>
        <Link to='/login' >Login here</Link>
        </div>
    </div>
    </>
  );
}

export default SignupForm;


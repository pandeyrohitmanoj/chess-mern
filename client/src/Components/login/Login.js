import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Spinners from '../spinner/Spinners'

import usePassword from '../localStorage/GetLocallySavedPassword'

import {getAuthenticateProfile } from '../requests' 

import './login.css';

function LoginForm( {registered, setRegistered, setSelectedOneCity, setSelectedCountry, setPhonNo, setUserName, setEmailId, isLoading, setLoading,  } ) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const  { userEmail ,userPassword, setUserDetail} = usePassword()

  const navigate = useNavigate()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const clickButtonRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState( { emailError: '', passwordError: "", invalidError:"" })

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const validateEmail = ( email ) => {
    if(!emailRegex.test(email)){
      setErrorMessage( previous => {
        return { ...previous, emailError: "Invalid format"}
      })
      return false
    }
    setErrorMessage( previous => ({...previous, email:""}) )
    return true
  };

  useEffect( () => {
    const handleKeyPress = ( event ) => {
      const input = event.key
      if(input=="Enter"){
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
      console.log(userEmail, userPassword)
      if(userEmail && userPassword){
        const response = await getAuthenticateProfile(userEmail,userPassword)
        const {correctPassword, userExist, country, city, phone, userName} = response
        // console.log(correctPassword, userExist, country, city, phone, email, userName)
        if( correctPassword && userExist){
      console.log(userEmail ,userPassword)

          setRegistered(true)
          setSelectedOneCity(city)
          setSelectedCountry(country)
          setEmailId(usePassword.userEmail)
          setPhonNo(phone)
          setUserName(userName)
          navigate('/app')
        }
      }
    }
    ifUserIsAuthenticated()
  }, [userEmail, userPassword] )

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const isValidEmail = validateEmail(email)
    // const isValidPassword = validPassword(password)
    // console.log(isValidEmail)
    if(isValidEmail){
      const response = await getAuthenticateProfile(email,password)
      const {correctPassword, userExist, country, city, phone, userName} = response
      //console.log(correctPassword, userExist, country, city, phone, email, userName)
      if( correctPassword && userExist){
        setRegistered(true)
        setSelectedOneCity(city)
        setSelectedCountry(country)
        setEmailId(email)
        setPhonNo(phone)
        setUserName(userName)
        setUserDetail(email,password)
        setLoading(false)
        navigate('/app')
        // console.log(usePassword.password,"  ",usePassword.userEmail)
      }else{
        setErrorMessage( previous => ({...previous, invalidError:"Invalid email or password"}) )        
      }
    }
    setLoading(false)
  };

  return (
    <div className='login-container' >
      <Spinners isLoading={isLoading} />
        <div className="login-form">
        <h1 className="login-form__title">Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="login-form__label">Email:</label>
            <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Enter your Gmail address"
            className="login-form__input"
            required
            />
            <span className="error-message">{errorMessage.emailError}</span>
            <label htmlFor="password" className="login-form__label">Password:</label>
            <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Enter your password"
            className="login-form__input"
            required
            />
            <span className="error-message">{errorMessage.passwordError}</span>
            <span className="error-message">{errorMessage.invalidError}</span>

            <button type="submit" className="login-form__button" ref={clickButtonRef}>Login</button>
        </form>

        <p>Dont have a account</p>
        <Link to="/signup">Sign in</Link>
        </div>
    </div>
  );
}

export default LoginForm;




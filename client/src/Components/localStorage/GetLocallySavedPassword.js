import { useState, useEffect } from 'react'

const usePassword = () => {
  const [userEmail,setUserEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    // Retrieve the password from local storage on component mount
    const savedUserEmail = localStorage.getItem('email')
    const savedPassword = localStorage.getItem('password')
    
    setUserEmail(savedUserEmail)
    setPassword(savedPassword)
  }, [])

  const setPasswordAndStore = (newEmail,newPassword) => {
    console.log(newEmail, " ", newPassword)
    localStorage.setItem('email', newEmail )
    localStorage.setItem('password', newPassword)
    setUserEmail(newEmail)
    setPassword(newPassword)
  }

  const removeUserDetail = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
  }

  return { userEmail ,userPassword: password, setUserDetail: setPasswordAndStore, removeUserDetail}
}

export default usePassword
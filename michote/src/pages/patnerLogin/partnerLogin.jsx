import React from 'react'
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './partnerLogin.css'

import { login, resetPartners } from '../../features/partner/partnerSlice';

export default function PartnerLogin() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { partnerIsLoggedIn, loggedInPartner, partnerIsError, partnerISuccess, partnerIsLoading,
    partnerMessage, partnerCreated } = useSelector((state) => state.partners);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = loginData;


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  useEffect(() => {
    if (partnerIsLoggedIn) {
      navigate("/")
    }

    if (partnerIsError) {
      alert.error(partnerMessage);
    }

    if (partnerIsError) {
      setLoginData({
        email: "",
        password: "",
      })

      alert.info("Successfull login")
      navigate("/")
    }

    dispatch(resetPartners());
  }, [partnerIsLoggedIn, dispatch, navigate, partnerIsError]);


  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email) {
      alert.error("Email cannot be empty");
      return;
    }
    if (!password) {
      alert.error("Password cannot be empty");
      return;
    }

    dispatch(login(loginData));
  }

  return (
    <div className='login-page'>
      <div className='login-div'>
        <div className="logo-bg"></div>
        <h4>Welcome back</h4>
        <p>Login let's make our partnership stronger...</p>
        <div className="p-login-inputs">
          <input type="text" name="email" onChange={handleChange}
            placeholder='Enter your number or email' />
          <input type="password" name="password" onChange={handleChange} placeholder='Enter your password' />
          <button onClick={handleSubmit}>LOGIN</button>
        </div>
        <div className="register-link">
          <p>You don't have an account yet?</p>
          <button onClick={() => navigate("/partners/register")}>REGISTER</button>
        </div>

      </div>
    </div>
  )
}
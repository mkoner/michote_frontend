import React from 'react'
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './userLogin.css'

import { login, resetCustomers } from '../../features/customer/customerSlice';

export default function UserLogin() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customerIsLoggedIn, loggedInCustomer, customerIsError, customerISuccess, customerIsLoading,
    customerMessage, customerCreated } = useSelector((state) => state.customers);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = loginData;


  useEffect(() => {
    if (customerIsLoggedIn) {
      navigate("/")
    }

    if (customerIsError) {
      alert.error(customerMessage);
    }

    if (customerISuccess) {
      setLoginData({
        email: "",
        password: "",
      })

      alert.info("Successfull login")
      navigate("/")
    }

    dispatch(resetCustomers());
  }, [customerIsLoggedIn, dispatch, navigate, customerIsError]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

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
        <div className="login-inputs">
          <input type="text" name="email" onChange={handleChange}
            placeholder='Enter your email' />
          <input type="password" name="password" onChange={handleChange}
            placeholder='Enter your password' />
          <button onClick={handleSubmit}>LOGIN</button>
        </div>
        <div className="register-link">
          <p>You don't have an account yet?</p>
          <button onClick={() => navigate("/register")}>REGISTER</button>
        </div>
      </div>
    </div>
  )
}

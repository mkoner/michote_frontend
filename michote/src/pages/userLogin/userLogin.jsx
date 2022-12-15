import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import './userLogin.css'

export default function UserLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Login");
    console.log(loginData);
  }
  return (
    <div className='login-page'>
          <div className='login-div'>
          <div className="logo-bg"></div>
            <h4>Welcome back</h4>
            <div className="login-inputs">
                <input type="text" name="username" onChange={handleChange}
                placeholder='Enter your number or email'/>
                <input type="password" name="password" onChange={handleChange}
                 placeholder='Enter your password'/>
                <button onClick={handleSubmit}>LOGIN</button>
            </div>
            <div className="register-link">
                <p>You don't have an account yet?</p>
                <button onClick={()=>navigate("/register")}>REGISTER</button>
            </div>
        </div>
    </div>
  )
}

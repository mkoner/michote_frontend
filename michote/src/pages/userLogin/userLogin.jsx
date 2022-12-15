import React from 'react'
import { useNavigate } from "react-router-dom";

import './userLogin.css'

export default function UserLogin() {
  const navigate = useNavigate();
  return (
    <div className='login-page'>
          <div className='login-div'>
          <div className="logo-bg"></div>
            <h4>Welcome back</h4>
            <div className="login-inputs">
                <input type="text" name="username" placeholder='Enter your number or email'/>
                <input type="text" name="password" id="" placeholder='Enter your password'/>
                <button>LOGIN</button>
            </div>
            <div className="register-link">
                <p>You don't have an account yet?</p>
                <button onClick={()=>navigate("/register")}>REGISTER</button>
            </div>
        </div>
    </div>
  )
}

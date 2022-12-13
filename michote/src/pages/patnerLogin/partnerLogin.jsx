import React from 'react'

import './partnerLogin.css'

export default function PartnerLogin() {
  return (
    <div className='login-page'>
          <div className='login-div'>
          <div className="logo-bg"></div>
            <h4>Welcome back</h4>
            <p>Login let's make our partnership stronger...</p>
            <div className="p-login-inputs">
                <input type="text" name="username" placeholder='Enter your number or email'/>
                <input type="text" name="password" id="" placeholder='Enter your password'/>
                <button>LOGIN</button>
            </div>
            <div className="register-link">
                <p>You don't have an account yet?</p>
                <button>REGISTER</button>
            </div>
            
        </div>
    </div>
  )
}
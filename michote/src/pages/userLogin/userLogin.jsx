import React from 'react'

import './userLogin.css'

export default function UserLogin() {
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
            
        </div>
    </div>
  )
}

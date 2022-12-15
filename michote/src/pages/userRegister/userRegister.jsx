import React from 'react'
import { useState, useEffect } from "react";


import './userRegister.css'

export default function UserRegister() {

    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        password: "",
        confirmedPassword: "",
        email: "",
        number: "",
        country: "",
        city: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Registered")
        console.log(userData);
    }

  return (
    <div className='register-page'>
        <h4>Register</h4>
        <div className="register-message">
            Create your account and feel the comfort
        </div>
        <div className="register-form">
            <div className="register-form-item">
                <label htmlFor="fname">First name*:</label>
                <input type="text" name='fname' placeholder='Entrer your first name'
                      value={userData.fname} onChange={handleChange} />
            </div>
            <div className="register-form-item">
                <label htmlFor="lname">Last name*:</label>
                <input type="text" name='lname' placeholder='Entrer your last name'
                      value={userData.lname} onChange={handleChange} />
            </div>
            <div className="register-form-item">
                <label htmlFor="fname">Phone number*:</label>
                <input type="text" name='number' placeholder='Entrer your phone number'
                      value={userData.number} onChange={handleChange} />
            </div>
            <div className="register-form-item">
                <label htmlFor="fname">Email address*:</label>
                <input type="text" name='email' placeholder='Entrer your email'
                      value={userData.email} onChange={handleChange} />
            </div>
            <div className="register-form-item">
                <label htmlFor="fname">Living country*:</label>
                <input type="text" name='country' placeholder='Entrer the country you live in'
                      value={userData.country} onChange={handleChange} />
            </div>
            <div className="register-form-item">
                <label htmlFor="fname">Living city*:</label>
                <input type="text" name='city' placeholder='Entrer the city you live in'
                      value={userData.city} onChange={handleChange} />
            </div>
            <div className="register-form-item">
                <label htmlFor="fname">Create your password*:</label>
                <input type="password" name='password' placeholder='Enter a password'
                      value={userData.password} onChange={handleChange} />
            </div>
            <div className="register-form-item">
                <label htmlFor="fname">Confirm your password*:</label>
                <input type="password" name='confirmedPassword' placeholder='Confirm your password'
                      value={userData.confirmedPassword} onChange={handleChange} />
            </div>
        </div>
        <button onClick={handleSubmit}>Register</button>
    </div>
  )
}

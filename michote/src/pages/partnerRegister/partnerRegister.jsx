import React from 'react'
import { useState, useEffect } from "react";


import './partnerRegister.css'

export default function PartnerRegister() {

    const [userData, setUserData] = useState({
        company: "",
        password: "",
        confirmedPassword: "",
        email: "",
        number: "",
        country: "",
        city: "",
        paddress: "",
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
        console.log("Registered");
        console.log(userData);
    }

  return (
    <div className='register-page'>
        <h4>Register your company</h4>
        <div className="register-message">
            Do you own or run a bus company?<br/>
            Register with us and inscrease your sales<br/>
            Sell tickets from anywhere anytime...
        </div>
        <div className="register-form">
            <div className="register-form-item">
                <label htmlFor="fname">Company name*:</label>
                <input type="text" name='company' placeholder='Entrer your company name'
                      value={userData.company} onChange={handleChange} />
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
                <label htmlFor="fname">Country*:</label>
                <input type="text" name='country' placeholder='Entrer the country your company is based'
                      value={userData.country} onChange={handleChange} />
            </div>
            <div className="register-form-item">
                <label htmlFor="fname">City*:</label>
                <input type="text" name='city' placeholder='Entrer the city your company is based'
                      value={userData.city} onChange={handleChange} />
            </div>
            <div className="register-form-item">
                <label htmlFor="fname">Postal address*:</label>
                <input type="text" name='paddress' placeholder='Entrer the city your postal address'
                      value={userData.paddress} onChange={handleChange} />
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
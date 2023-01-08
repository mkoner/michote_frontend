import React from 'react'
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './partnerRegister.css'


import { createPartner, resetPartners } from '../../features/partner/partnerSlice';

export default function PartnerRegister() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { partnerIsLoggedIn, loggedInpartner, partnerIsError, partnerISuccess, partnerIsLoading,
        partnerMessage, partnerCreated } = useSelector((state) => state.partners);

    const [userData, setUserData] = useState({
        name: "",
        password: "",
        confirmedPassword: "",
        email: "",
        number: "",
        country: "",
        address: "",
    });
    const { name, password, confirmedPassword, email, number, country, address } = userData;

    useEffect(() => {
        if (partnerIsLoggedIn) {
            navigate("/")
        }

        if (partnerIsError) {
            alert.error(partnerMessage);
        }

        if (partnerCreated) {
            setUserData({
                name: "",
                password: "",
                confirmedPassword: "",
                email: "",
                number: "",
                country: "",
                address: "",
            })

            alert.info("Account created")
            navigate("/")
        }

        dispatch(resetPartners());
    }, [partnerIsLoggedIn, dispatch, navigate, partnerIsError, partnerCreated]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!name) {
            alert.error("Company name cannot be empty");
            return;
        }

        if (!number) {
            alert.error("Phone number cannot be emty");
            return;
        }

        if (!email) {
            alert.error("Email cannot be emty");
            return;
        }

        if (!email) {
            alert.error("Email cannot be emty");
            return;
        }

        if (!address) {
            alert.error("Postal address cannot be emty");
            return;
        }

        if (!password) {
            alert.error("Password cannot be empty");
            return;
        }

        if (!(number.replaceAll(" ", "").match('[0-9]'))) {
            alert.error("Number should only contain digits");
            return;
        }

        if (email && !(email.replaceAll(" ", "").match("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"))) {
            alert.error("Confirm your email");
            return;
        }

        if (password != confirmedPassword) {
            alert.error("Error confirming password");
            return;
        }

        const partner = {
            partner_name: name,
            postal_address: address,
            password,
            email: email.replaceAll(" ", ""),
            phone_number: number.replaceAll(" ", ""),
            country,
        }
        dispatch(createPartner(partner));

    }

    return (
        <div className='register-page'>
            <h4>Register your company</h4>
            <div className="register-message">
                Do you own or run a bus company?<br />
                Register with us and inscrease your sales<br />
                Sell tickets from anywhere anytime...
            </div>
            <div className="register-form">
                <div className="register-form-item">
                    <label htmlFor="fname">Company name*:</label>
                    <input type="text" name='name' placeholder='Entrer your company name'
                        value={name} onChange={handleChange} />
                </div>
                <div className="register-form-item">
                    <label htmlFor="fname">Phone number*:</label>
                    <input type="text" name='number' placeholder='Entrer your phone number'
                        value={number} onChange={handleChange} />
                </div>
                <div className="register-form-item">
                    <label htmlFor="fname">Email address*:</label>
                    <input type="text" name='email' placeholder='Entrer your email'
                        value={email} onChange={handleChange} />
                </div>
                <div className="register-form-item">
                    <label htmlFor="fname">Country*:</label>
                    <input type="text" name='country' placeholder='Entrer the country your company is based'
                        value={country} onChange={handleChange} />
                </div>
                <div className="register-form-item">
                    <label htmlFor="fname">Postal address*:</label>
                    <input type="text" name='address' placeholder='Entrer the city your postal address'
                        value={address} onChange={handleChange} />
                </div>
                <div className="register-form-item">
                    <label htmlFor="fname">Create your password*:</label>
                    <input type="password" name='password' placeholder='Enter a password'
                        value={password} onChange={handleChange} />
                </div>
                <div className="register-form-item">
                    <label htmlFor="fname">Confirm your password*:</label>
                    <input type="password" name='confirmedPassword' placeholder='Confirm your password'
                        value={confirmedPassword} onChange={handleChange} />
                </div>
            </div>
            <button onClick={handleSubmit}>Register</button>
        </div>
    )
}
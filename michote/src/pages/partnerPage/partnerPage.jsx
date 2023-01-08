import React from 'react'
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './partnerPage.css'


import { updatePartner, resetPartners } from '../../features/partner/partnerSlice';

export default function PartnerPage() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { partnerIsLoggedIn, loggedInPartner, partnerIsError, partnerISuccess, partnerIsLoading,
        partnerMessage, partnerCreated } = useSelector((state) => state.partners);

    const initialState = {
        name: loggedInPartner.partner_name, 
        password: "",
        confirmedPassword: "",
        email: loggedInPartner.email,
        number: loggedInPartner.phone_number,
        country: loggedInPartner.country,
        address: loggedInPartner.postal_address,
    };
    const [userData, setUserData] = useState(initialState);
    const { name, password, confirmedPassword, email, number, country, address } = userData;

    useEffect(() => {
        if (!partnerIsLoggedIn) {
            navigate("/partners/login")
        }

        if (partnerIsError) {
            alert.error(partnerMessage);
        }

        setUserData(initialState);

        dispatch(resetPartners());
    }, [partnerIsLoggedIn, dispatch, navigate, partnerIsError, loggedInPartner]);

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

        const partner = password ? {
            partner_name: name,
            postal_address: address,
            password,
            email: email.replaceAll(" ", ""),
            phone_number: number.replaceAll(" ", ""),
            country,
        } :
            {
                partner_name: name,
                postal_address: address,
                email: email.replaceAll(" ", ""),
                phone_number: number.replaceAll(" ", ""),
                country,
            };

        const updateData = {
            id: loggedInPartner.id,
            partner,
        }
        dispatch(updatePartner(updateData));

    }

    return (
        <div className='register-page'>
            <h4>Your company details</h4>
            
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
            <button onClick={handleSubmit}>UPDATE</button>
        </div>
    )
}
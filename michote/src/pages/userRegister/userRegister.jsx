import React from 'react'
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createUser, resetCustomers } from '../../features/customer/customerSlice';


import './userRegister.css'

export default function UserRegister() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const { customerIsLoggedIn, loggedInCustomer, customerIsError, customerISuccess, customerIsLoading,
        customerMessage, customerCreated } = useSelector((state) => state.customers);

    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        password: "",
        confirmedPassword: "",
        email: "",
        number: "",
        country: "",
    });
    const { fname, lname, password, confirmedPassword, email, number, country } = userData;

    useEffect(() => {
        if (customerIsLoggedIn) {
            navigate("/")
        }

        if (customerIsError) {
            alert.error(customerMessage);
        }

        if (customerCreated) {
            setUserData({
                fname: "",
                lname: "",
                password: "",
                confirmedPassword: "",
                email: "",
                number: "",
                country: "",
            })

            alert.info("Account created")
            navigate("/")
        }

        dispatch(resetCustomers());
    }, [customerIsLoggedIn, dispatch, navigate, customerIsError, customerCreated]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!fname) {
            alert.error("First name cannot be empty");
            return;
        }
        if (!lname) {
            alert.error("Last name cannot be empty");
            return;
        }

        if (!number) {
            alert.error("Phone number cannot be empty");
            return;
        }

        if (!email) {
            alert.error("Email cannot be empty");
            return;
        }

        if (!country) {
            alert.error("Country cannot be empty");
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

        const customer = {
            first_name: fname,
            last_name: lname,
            password,
            email :email.replaceAll(" ", ""),
            phone_number: number.replaceAll(" ", ""),
            country,
        }
        dispatch(createUser(customer));

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
                        value={fname} onChange={handleChange} />
                </div>
                <div className="register-form-item">
                    <label htmlFor="lname">Last name*:</label>
                    <input type="text" name='lname' placeholder='Entrer your last name'
                        value={lname} onChange={handleChange} />
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
                    <label htmlFor="fname">Living country*:</label>
                    <input type="text" name='country' placeholder='Entrer the country you live in'
                        value={country} onChange={handleChange} />
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

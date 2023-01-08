import React from 'react'
import {useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './bookingSuccess.css'





export default function BookingSuccess() {
    const navigate = useNavigate();
    const alert = useAlert()
    const dispatch = useDispatch();



  return (
    <div className="booking-success">
        <p>
            Thank you for booking with <span>Michote</span>. <br />
            Please do repport 30 min before departure fro check ins. <br />
            Have a nice trip.
        </p>
        <a href="/customers/bookings">Check details of your bookings here</a>
    </div>
  )
}

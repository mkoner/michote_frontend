import React from 'react'
import { useState } from 'react'

import './booking.css'

export default function BookingPage() {
  const [bookingData, setBookingData] = useState({
    fname: "",
    lname: "",
    number: "",
    email: "",
    seats: 1,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setBookingData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleBooking = (evt) => {
    evt.preventDefault();
    console.log(bookingData);
  }
  return (
    <div className="booking-page-container">
        <h2>Book your seats</h2>
        <div className="trip-details">
            <h4>Your Company</h4>
            <p className="trip-details-fromto">From <span>Abidjan</span> To <span>Bouake</span></p>
            <p className="trip-details-departure">Departure: <span>Monday 11th January 2022 10:00</span></p>
            <p className="trip-details-arrival">Estimated arrival: <span>Monday 11th January 2022 10:00</span></p>
            <p className="trip-details-price">Price/seat: <span>10000 CFA</span></p>
        </div>
        <form>
            <div className="booking-form-element">
            <label htmlFor="fname">First name:</label> <br/>
            <input type="text" id="fname" name="fname"onChange={handleChange}/>
            </div>
            
            <div className="booking-form-element">
            <label htmlFor="lname">Last name:</label> <br/>
            <input type="text" id="lname" name="lname" onChange={handleChange}/>
            </div>
            
            <div className="booking-form-element">
            <label htmlFor="number">Phone number:</label> <br/>
            <input type="text" id="phone" name="number" onChange={handleChange}/>
            </div>
            
            <div className="booking-form-element">
            <label htmlFor="email">Email address:</label> <br/>
            <input type="text" id="email" name="email" onChange={handleChange}/>
            </div>
            
            <div className="booking-form-element">
            <label htmlFor="seats">Number of seats:</label> <br/>
            <input type="number" min="1" id="seats" name="seats" onChange={handleChange}/>
            </div>
            <button onClick={handleBooking}>BOOK</button>
        </form>
    </div>
  )
}

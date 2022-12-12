import React from 'react'

import './booking.css'

export default function BookingPage() {
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
            <label for="fname">First name:</label> <br/>
            <input type="text" id="fname" name="fname"/>
            </div>
            
            <div className="booking-form-element">
            <label for="lname">Last name:</label> <br/>
            <input type="text" id="lname" name="lname"/>
            </div>
            
            <div className="booking-form-element">
            <label for="lname">Phone number:</label> <br/>
            <input type="text" id="phone" name="phone"/>
            </div>
            
            <div className="booking-form-element">
            <label for="lname">Email address:</label> <br/>
            <input type="text" id="email" name="email"/>
            </div>
            
            <div className="booking-form-element">
            <label for="lname">Number of seats:</label> <br/>
            <input type="number" min="1" id="seats" name="seats"/>
            </div>
            <button>BOOK</button>
        </form>
    </div>
  )
}

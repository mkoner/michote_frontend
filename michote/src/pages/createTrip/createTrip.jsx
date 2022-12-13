import React from 'react'
import { useState, useEffect } from "react";

import './createTrip.css'

export default function CreateTrip() {

    const [tripData, setTripData] = useState({
        destination: "",
        departure: "",
        arrivalTime: null,
        departureTime: null,
        numberOfSeats: 0,
        price: 0,
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setTripData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Registered")
    }

  return (
    <div className="create-trip">
          <h4>Add a new trip</h4>
          <div className="trip-details">
              <div className="trip-details-element">
                  <label htmlFor="destination">Destination city*:</label>
                  <input type="text" name='destination' value={tripData.destination}
                      placeholder='Enter the destination city' onChange={handleChange}/>
              </div>
              <div className="trip-details-element">
                  <label htmlFor="destination">Departing city*:</label>
                  <input type="text" name='departure' value={tripData.departure}
                      placeholder='Enter the departing city' onChange={handleChange}/>
              </div>

              <div className="trip-details-element">
                  <label htmlFor="destination">Departure time*:</label>
                  <input type="datetime-local" name='departureTime' value={tripData.departureTime}
                      placeholder='Enter the departure time' onChange={handleChange}/>
              </div>

              <div className="trip-details-element">
                  <label htmlFor="destination">Estimated arrival time*:</label>
                  <input type="datetime-local" name='arrivalTime' value={tripData.arrivalTime}
                      placeholder='Enter the arrival time' onChange={handleChange}/>
              </div>

              <div className="trip-details-element">
                  <label htmlFor="destination">Price per seat*:</label>
                  <input type="number" min="1" step="0.01" name='price' value={tripData.price}
                      placeholder='Enter the price of a seat' onChange={handleChange}/>
              </div>

              <div className="trip-details-element">
                  <label htmlFor="destination">Available seats*:</label>
                  <input type="number" min="1"name='numberOfSeats' value={tripData.numberOfSeats}
                      placeholder='Enter the number of seats' onChange={handleChange}/>
              </div>
          </div>
          <button onClick={handleSubmit}>ADD TRIP</button>
    </div>
  )
}

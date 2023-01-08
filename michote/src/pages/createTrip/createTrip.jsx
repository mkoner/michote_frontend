import React from 'react'
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './createTrip.css'

import { createRoute, resetRoutes } from '../../features/route/routeSlice';

export default function CreateTrip() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {routeIsError, routeISuccess, routeIsLoading,
        routeMessage, routeCreated } = useSelector((state) => state.routes);

    const { partnerIsLoggedIn, loggedInPartner } = useSelector((state) => state.partners);


    const [tripData, setTripData] = useState({
        destination: "",
        departure: "",
        arrivalTime: null,
        departureTime: null,
        numberOfSeats: 0,
        price: 0,
        currency: '',
    });
    const { destination, departure, arrivalTime, departureTime, numberOfSeats, price,
        currency } = tripData;

    useEffect(() => {
        if (!partnerIsLoggedIn) {
            navigate("/partners/login")
        }

        if (routeIsError) {
            alert.error(routeMessage);
        }

        if (routeCreated) {
            setTripData({
                destination: "",
                departure: "",
                arrivalTime: null,
                departureTime: null,
                numberOfSeats: 0,
                price: 0,
                currency: '',
            })

            alert.info("Trip created")
            navigate("/")
        }

        dispatch(resetRoutes());
    }, [partnerIsLoggedIn, dispatch, navigate, routeIsError, routeCreated]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setTripData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!destination) {
            alert.error("Destination cannot be empty");
            return;
        }
        if (!departure) {
            alert.error("Departure cannot be empty");
            return;
        }

        if (!arrivalTime) {
            alert.error("Arrival time cannot be empty");
            return;
        }

        if (!departureTime) {
            alert.error("Departure time cannot be empty");
            return;
        }

        if (!numberOfSeats || numberOfSeats == 0) {
            alert.error("Departure time cannot be empty or zero");
            return;
        }

        if (!price || price == 0) {
            alert.error("Price cannot be empty or zero");
            return;
        }
        
        if (!currency) {
            alert.error("Currency cannot be empty");
            return;
        }

        const trip = {
            partner_id: loggedInPartner.id,
            start_destination: departure,
            end_destination: destination,
            period_begin: departureTime,
            period_end: arrivalTime,
            price_per_ticket: price,
            currency,
            slots_available: numberOfSeats,
        }
        dispatch(createRoute(trip));

    }

    return (
        <div className="create-trip">
            <h4>Add a new trip</h4>
            <div className="trip-details">
                <div className="trip-details-element">
                    <label htmlFor="destination">Destination city*:</label>
                    <input type="text" name='destination' value={destination}
                        placeholder='Enter the destination city' onChange={handleChange} />
                </div>
                <div className="trip-details-element">
                    <label htmlFor="destination">Departing city*:</label>
                    <input type="text" name='departure' value={departure}
                        placeholder='Enter the departing city' onChange={handleChange} />
                </div>

                <div className="trip-details-element">
                    <label htmlFor="destination">Departure time*:</label>
                    <input type="datetime-local" name='departureTime' value={departureTime}
                        placeholder='Enter the departure time' onChange={handleChange} />
                </div>

                <div className="trip-details-element">
                    <label htmlFor="destination">Estimated arrival time*:</label>
                    <input type="datetime-local" name='arrivalTime' value={arrivalTime}
                        placeholder='Enter the arrival time' onChange={handleChange} />
                </div>

                <div className="trip-details-element">
                    <label htmlFor="destination">Price per seat*:</label>
                    <input type="number" min="1" step="0.01" name='price' value={price}
                        placeholder='Enter the price of a seat' onChange={handleChange} />
                </div>

                <div className="trip-details-element">
                    <label htmlFor="destination">Currency*:</label>
                    <input type="text" name='currency' value={currency}
                        placeholder='Enter the currency' onChange={handleChange} />
                </div>

                <div className="trip-details-element">
                    <label htmlFor="destination">Available seats*:</label>
                    <input type="number" min="1" name='numberOfSeats' value={numberOfSeats}
                        placeholder='Enter the number of seats' onChange={handleChange} />
                </div>
            </div>
            <button onClick={handleSubmit}>ADD TRIP</button>
        </div>
    )
}

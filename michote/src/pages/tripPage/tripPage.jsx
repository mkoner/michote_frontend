import React from 'react'
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './tripPage.css'

import { getRouteById, updateRoute, resetRoutes } from '../../features/route/routeSlice';

export default function TripPage() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    const { selectedRoute, routeIsError, routeISuccess, routeIsLoading,
        routeMessage, routeCreated } = useSelector((state) => state.routes);

    const { partnerIsLoggedIn } = useSelector((state) => state.partners);

    const formatDate = (date) => {
        const details = date.split(' ');
        return new Date(`${details[2]} ${details[1]}, ${details[3]} ${details[4]}`);
    }

    const initialState = {
        destination: selectedRoute.end_destination,
        departure: selectedRoute.start_destination,
        arrivalTime: selectedRoute.period_end,
        departureTime: selectedRoute.period_begin,
        numberOfSeats: selectedRoute.slots_available,
        price: selectedRoute.price_per_ticket,
        currency: selectedRoute.currency,
    }

    const [tripData, setTripData] = useState(initialState);

    const [dateValues, setDateValues] = useState({
        start: null,
        end: null,
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

        dispatch(getRouteById(id));


        setTripData(initialState);
        setDateValues({})

    }, [partnerIsLoggedIn, dispatch, navigate, routeIsError, id]);

    useEffect(() => {
        setTripData(initialState);
    }, [selectedRoute]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setTripData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleDateChange = (evt) => {
        const { name, value } = evt.target;
        setDateValues((prevState) => ({
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


        var trip = {}

        if (dateValues.start && dateValues.end) {
            trip = {
                start_destination: departure,
                end_destination: destination,
                period_begin: dateValues.start,
                period_end: dateValues.end,
                price_per_ticket: price,
                currency,
                slots_available: numberOfSeats,
            }
        }
        else if (!dateValues.start && dateValues.end) {
            trip = {
                start_destination: departure,
                end_destination: destination,
                period_end: dateValues.end,
                price_per_ticket: price,
                currency,
                slots_available: numberOfSeats,
            }
        }
        else if (dateValues.start && !dateValues.end) {
            trip = {
                start_destination: departure,
                end_destination: destination,
                period_start: dateValues.start,
                price_per_ticket: price,
                currency,
                slots_available: numberOfSeats,
            }
        } else {
            trip = {
                start_destination: departure,
                end_destination: destination,
                price_per_ticket: price,
                currency,
                slots_available: numberOfSeats,
            }
        }


        const updateData = {
            id: selectedRoute.id,
            route: trip,
        }
        dispatch(updateRoute(updateData));
        if (routeISuccess) {
            alert.info("Trip updated successfully")
        }

    }

    return (
        <div className="create-trip">
            <h4>Trip details</h4>
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
                    <label htmlFor="destination">Departure time*:</label> {departureTime}
                    <input type="datetime-local" name='start'
                        placeholder='Enter the departure time' onChange={handleDateChange} />
                </div>

                <div className="trip-details-element">
                    <label htmlFor="destination">Estimated arrival time*:</label> {arrivalTime}
                    <input type="datetime-local" name='end'
                        placeholder='Enter the arrival time' onChange={handleDateChange} />
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
            <button onClick={handleSubmit}>UPDATE TRIP</button>
        </div>
    )
}

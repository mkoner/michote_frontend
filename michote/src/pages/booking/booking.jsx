import React from 'react'
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './booking.css'

import { createBooking, resetBookings } from '../../features/booking/bookingSlice';
import { getRouteById, updateRoute, resetRoutes } from '../../features/route/routeSlice';
import { getPartnerById, resetPartners } from '../../features/partner/partnerSlice'
import { createUser, resetCustomers } from '../../features/customer/customerSlice';

export default function BookingPage() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { customerIsLoggedIn, loggedInCustomer, customerIsError, customerISuccess, customerIsLoading,
    customerMessage } = useSelector((state) => state.customers);

  const { selectedRoute, routeIsError, routeISuccess, routeIsLoading,
    routeMessage } = useSelector((state) => state.routes);

  const { bookingIsError, bookingISuccess, bookingIsLoading,
    bookingMessage, bookingCreated } = useSelector((state) => state.bookings);

  const { selectedPartner, partnerIsError, partnerISuccess, partnerIsLoading,
    partnerMessage } = useSelector((state) => state.partners);


    const initialState = customerIsLoggedIn ? {
      fname: loggedInCustomer.first_name,
      lname: loggedInCustomer.last_name,
      number: loggedInCustomer.phone_number,
      email: loggedInCustomer.email,
      seats: 1,
    } : {}
  const [bookingData, setBookingData] = useState(initialState);

  const { fname, lname, number, email, seats } = bookingData;

  useEffect(() => {
    if (!customerIsLoggedIn) {
      navigate("/login")
    }

    if (bookingIsError) {
      alert.error(bookingMessage);
    }
    if (routeIsError) {
      alert.error(routeMessage);
    }
    if (partnerIsError) {
      alert.error(partnerMessage);
    }

    if (bookingCreated) {
      setBookingData(initialState)

      alert.info("Trip Booked")
      navigate("/booking/success")
    }
    dispatch(getRouteById(id));
    dispatch(getPartnerById(selectedRoute.partner_id));

    dispatch(resetBookings());
    dispatch(resetPartners())
    dispatch(resetRoutes())
  }, [customerIsLoggedIn, dispatch, navigate, partnerIsError, bookingIsError, bookingCreated, id]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setBookingData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleBooking = (evt) => {
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

    if (seats < 1) {
      alert.error("Number of seats cannot be less than 1");
      return;
    }

    const booking = {
      customer_id: loggedInCustomer.id,
      route_id: id,
      partner_id: selectedRoute.partner_id,
      no_of_seats_booked: seats,
      total_amount: seats * selectedRoute.price_per_ticket,
    }
    dispatch(createBooking(booking));
    const updateData = {
      id: selectedRoute.id,
      route: {
        slots_available: selectedRoute.slots_available - seats,
      },
    }
    dispatch(updateRoute(updateData));
  }


  return (
    <div className="booking-page-container">
      <h2>Book your seats</h2>
      <div className="booking-trip-details">
        <h4> {selectedPartner.partner_name} </h4>
        <p className="trip-details-fromto">From <span>{selectedRoute.start_destination}</span> To <span>{selectedRoute.end_destination}</span></p>
        <p className="trip-details-departure">Departure: <span>{selectedRoute.period_begin}</span></p>
        <p className="trip-details-arrival">Estimated arrival: <span>{selectedRoute.period_end}</span></p>
        <p className="trip-details-price">Price/seat: <span>{selectedRoute.price_per_ticket} {selectedRoute.currency}</span></p>
      </div>
      <form>
        <div className="booking-form-element">
          <label htmlFor="fname">First name:</label> <br />
          <input type="text" id="fname" name="fname" onChange={handleChange} value={fname} />
        </div>

        <div className="booking-form-element">
          <label htmlFor="lname">Last name:</label> <br />
          <input type="text" id="lname" name="lname" onChange={handleChange} value={lname} />
        </div>

        <div className="booking-form-element">
          <label htmlFor="number">Phone number:</label> <br />
          <input type="text" id="phone" name="number" onChange={handleChange} value={number} />
        </div>

        <div className="booking-form-element">
          <label htmlFor="email">Email address:</label> <br />
          <input type="text" id="email" name="email" onChange={handleChange} value={email} />
        </div>

        <div className="booking-form-element">
          <label htmlFor="seats">Number of seats:</label> <br />
          <input type="number" min="1" id="seats" name="seats" onChange={handleChange} value={seats} />
        </div>
        <div className="booking-form-element">
          <label htmlFor="seats">Total to pay:</label> <br />
          <input type="number" disabled value={seats * selectedRoute.price_per_ticket} />
        </div>
        <button onClick={handleBooking}>BOOK</button>
      </form>
    </div>
  )
}

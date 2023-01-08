import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './customerBookings.css'

import { getBookings, resetBookings } from '../../features/booking/bookingSlice'
import { getRouteById, resetRoutes } from '../../features/route/routeSlice'
import { getPartnerById, resetPartners } from '../../features/partner/partnerSlice'


export default function CustomerBookings() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { selectedRoute, routeIsError, routeISuccess, routeIsLoading,
        routeMessage, routeCreated } = useSelector((state) => state.routes);

    const { bookings, selectedBooking, bookingIsError, bookingISuccess, bookingIsLoading,
        bookingMessage, bookingCreated } = useSelector((state) => state.bookings);

    const { selectedPartner, partnerIsError } = useSelector((state) => state.partners);

    const { loggedInCustomer } = useSelector((state) => state.customers);

    const [bookingDetails, setBookingDetails] = useState([])
    const fetchData = (partner_id, route_id) => {
        dispatch(getPartnerById(partner_id));
        dispatch(getRouteById(route_id));
        bookingDetails.push({ route: selectedRoute, partner: selectedPartner })
    }



    useEffect(() => {
        if (!loggedInCustomer) {
            navigate("/login")
        }

        const string = `?customer_id=${loggedInCustomer.id}`

        dispatch(getBookings(string));

        if (bookingIsError) {
            alert.error(bookingMessage);
        }

        bookings?.map(async booking => {
            await fetchData(booking.partner_id, booking.route_id)
        })

        dispatch(resetRoutes());

    }, [loggedInCustomer, dispatch, navigate, bookingIsError, routeIsError, partnerIsError]);


    /* useEffect(() => {
     }, [bookings, navigate, bookingIsError, routeIsError, partnerIsError]) 
     useEffect(() => { }, [selectedRoute])
     useEffect(() => { }, [selectedPartner]) */




    if (bookingIsLoading) {
        return <></>
    }

    console.log(bookingDetails)



    return (
        <div className='trips-page'>

            <div className='trips-page-container'>
                <div className="trips-page-header">
                    <h4>Your Bookings</h4>
                </div>
                {bookingDetails.length > 0 && <div className='trips-table table-responsive'>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">COMPANY</th>
                                <th scope="col">FROM</th>
                                <th scope="col">DEPART TIME</th>
                                <th scope="col">TO</th>
                                <th scope="col">ARRIVAL TIME</th>
                                <th scope="col">SEATS BOOKED</th>
                                <th scope="col">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings?.map((booking, idx) => <tr key={idx}
                            >
                                
                                <td>{bookingDetails[idx].partner.partner_name}</td>
                                <td>{bookingDetails[idx].route.start_destination}</td>
                                <td>{bookingDetails[idx].route.period_begin}</td>
                                <td>{bookingDetails[idx].route.end_destination}</td>
                                <td>{bookingDetails[idx].route.period_end}</td>
                                <td>{booking.no_of_seats_booked}</td>
                                <td>{booking.total_amount}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    )
}

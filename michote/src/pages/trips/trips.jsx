import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './trips.css'

import { getRoutes, resetRoutes } from '../../features/route/routeSlice'
export default function PartnerTripsPage() {
    const alert = useAlert()
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const { routes, selectedRoute, routeIsError, routeISuccess, routeIsLoading,
        routeMessage, routeCreated } = useSelector((state) => state.routes);

    const { partnerIsLoggedIn, loggedInPartner } = useSelector((state) => state.partners);



    useEffect(() => {
        if (!partnerIsLoggedIn) {
            navigate("/partners/login")
        }

        const string = `?partner_id=${loggedInPartner.id}`

        dispatch(getRoutes(string));

        if (routeIsError) {
            alert.error(routeMessage);
        }

        dispatch(resetRoutes());
    }, [partnerIsLoggedIn, dispatch, navigate, routeIsError]);


    useEffect(() => { }, [routes])


    if (routeIsLoading) {
        return <></>
    }

    return (
        <div className='trips-page'>
            <div className='trips-page-container'>
                <div className="trips-page-header">
                    <h4>{loggedInPartner.partner_name} Trips</h4>
                    <button type="button" className="btn btn-primary"
                        onClick={() => navigate("/create-trip")}>Add Trip</button>
                </div>
                <div className='trips-table table-responsive'>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">DEPARTURE</th>
                                <th scope="col">DESTINATION</th>
                                <th scope="col">DEPART TIME</th>
                                <th scope="col">ARRIVAL TIME</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">AVAILABLE SEATS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routes?.map((route, idx) => <tr className='td-hover' key={idx}
                                onClick={() => navigate(`/routes/${route.id}`)}>
                                <td >{routes.start_destination}</td>
                                <td>{route.end_destination}</td>
                                <td>{route.period_begin}</td>
                                <td>{route.period_end}</td>
                                <td>{route.price_per_ticket}</td>
                                <td>{route.slots_available}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

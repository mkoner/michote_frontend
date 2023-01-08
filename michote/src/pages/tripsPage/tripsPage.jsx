import React from 'react'
import { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'




import SearchResult from '../../components/searchResult/searchResult'

import './tripsPage.css'

import { getRoutes, resetRoutes } from '../../features/route/routeSlice'



export default function TripsPage() {
  const { from } = useParams();
  const { to } = useParams();
  const alert = useAlert()
  const dispatch = useDispatch();

  const { routes, selectedRoute, routeIsError, routeISuccess, routeIsLoading,
    routeMessage, routeCreated } = useSelector((state) => state.routes);

  useEffect(() => {

    if (routeIsError) {
      alert.error(routeMessage);
    }

    const string = `?start_destination=${from}&end_destination=${to}`

    dispatch(getRoutes(string));

    dispatch(resetRoutes())
  }, [from, to, dispatch,]);


  return (
    <div className="search-trips-container">
      <h4>Trips</h4>
      {routes.length > 0 ?<div className='trips-page'>
        {
          routes?.map((route, idx) => <SearchResult route={route} key={idx} />)
        }
      </div> : 
      <div className="no-trips-found">
      <p>
        Oops no trip from <span>{from}</span> to <span>{to}</span> found
      </p>
    </div>}
    </div>
  )
}

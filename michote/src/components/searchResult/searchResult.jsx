import React from 'react'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './searchResult.css'

import { getPartnerById, resetPartners } from '../../features/partner/partnerSlice'

export default function SearchResult({ route }) {
    const navigate = useNavigate();
    const alert = useAlert()
    const dispatch = useDispatch();

    const { selectedPartner, partnerIsError, partnerISuccess, partnerIsLoading,
        partnerMessage } = useSelector((state) => state.partners);

    useEffect(() => {

        if (partnerIsError) {
            alert.error(partnerMessage);
        }

        dispatch(getPartnerById(route.partner_id));
        dispatch(resetPartners())
    }, [partnerIsError, route]);


    return (
        <div>
            <div className='search-result-component'>
                <div className="company-name">
                    <p>{selectedPartner.partner_name}</p>
                </div>
                <div className="trip-times">
                    <div className='dtime-atime'>
                        <div className='dtime-atime-depart dtime-atime-element'>
                            <span>{route.period_begin}</span>
                            <span>{route.start_destination.toUpperCase()}</span>
                        </div>
                        <span> -----------&#62; </span>
                        <div className='dtime-atime-arrival dtime-atime-element'>
                            <span>{route.period_end}</span>
                            <span>{route.end_destination.toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="available-seats">
                        {route.slots_available} seats available
                    </div>
                </div>
                <div className="price-book">
                    <div className='price'>
                        {route.price_per_ticket} {route.currency}
                    </div>
                    <div className="book-button">
                        <button onClick={() => navigate(`/book/${route.id}`)}>BOOK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

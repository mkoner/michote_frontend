import React from 'react'
import { useNavigate } from 'react-router-dom'

import './searchResult.css'

export default function SearchResult() {
    const navigate = useNavigate();

  return (
    <div>
            <div className='search-result-component'>
        <div className="company-name">
            <p>Company</p>
        </div>
        <div className="trip-times">
            <div className='dtime-atime'>
                <div className='dtime-atime-depart dtime-atime-element'> 
                <span>05:30 PM</span>
                <span>ABIDJAN, COTE D'IVOIRE</span>
                </div>
                  <span> -----------&#62; </span>
                  <div className='dtime-atime-arrival dtime-atime-element'>
                  <span>05:30 AM</span>
                  <span>BOUAKE, COTE D'IVOIRE</span>
                  </div>
            </div>
            <div className="available-seats">
                24 seats available
            </div>
        </div>
        <div className="price-book">
              <div className='price'>
                 11 000 FCFA
              </div>
              <div className="book-button">
                  <button onClick={()=>navigate("/book")}>BOOK</button>
              </div>
        </div>
    </div>
    </div>
  )
}

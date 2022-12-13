import React from 'react'

import './searchResult.css'

export default function SearchResult() {
  return (
    <div className='search-result-component'>
        <div className="company-name">
            <p>Company</p>
        </div>
        <div className="trip-times">
            <div className='dtime-atime'>
                 <span>05:30 PM</span>
                  <span> -----------&#62; </span>
                  <span>05:30 AM</span>
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
                  <button>BOOK</button>
              </div>
        </div>
    </div>
  )
}

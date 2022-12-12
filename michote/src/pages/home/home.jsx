import React from 'react'

import './home.css'

import comfortIcon from "../../assets/icons/comfort.png"
import securityIcon from "../../assets/icons/security.png"
import supportIcon from "../../assets/icons/support.png"
import abidjan from "../../assets/images/abidjan.jpg"
import nairobi from "../../assets/images/nairobi.jpg"
import addis from "../../assets/images/addis.jpg"


export default function Home() {
  return (
    <div className="home-page">
        <div className="search-container">
        <div className="message">
            <p>
                Book a bus ticket from the comfort of 
                <br/>
                your home
            </p>
        </div>
        <div className="search-form">
            <div className="from form-item">
                <label htmlFor="from">From</label>
                <input className='location-input' type="text" name='from'/>
            </div>
            <div className="to form-item">
                <label htmlFor="to">To</label>
                <input className='location-input' type="text" name='to'/>
            </div>
            <div className="date form-item">
                <label htmlFor="date">When</label>
                <input className='date-input' type="date" name='date'/>
            </div>
            <div className="submit form-item">
                <button>Search</button>
            </div>
        </div>    
        </div>
        
        <div className="top-destinations-container">
            <h3>Top destinations</h3>
            <div className="top-destinations">
            <div className="destination">
                <h4>Abidjan</h4>
                <img src={abidjan} alt="abidjan" />
            </div>
            <div className="destination">
                <h4>Nairobi</h4>
                <img src={nairobi} alt="nairobi" />
            </div>
            <div className="destination">
                <h4>Addis ababa</h4>
                <img src={addis} alt="Addis ababa" />
            </div>
            </div>
            
        </div>
        
          
        <div className="values">
            <div className="value">
                <div className="value-icon">
                    <img src={comfortIcon} alt="" />
                </div>
                <div className="value-content">
                    <h6>Comfort</h6>
                    <p>
                        From your own comfort to the most comfortable buses around
                    </p>
                </div>
              </div>
              
            <div className="value">
                <div className="value-icon">
                    <img src={securityIcon} alt="" />
                </div>
                <div className="value-content">
                    <h6>Security</h6>
                    <p>
                        Your safety and security is ou primary goal
                    </p>
                </div>
            </div>
              
            <div className="value">
                <div className="value-icon">
                    <img src={supportIcon} alt="" />
                </div>
                <div className="value-content">
                    <h6>Support</h6>
                    <p>
                        No stress we have a dedicated team to support you 24/7
                    </p>
                </div>
            </div>
        </div>


    </div>
  )
}

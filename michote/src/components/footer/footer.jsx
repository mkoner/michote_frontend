import React from 'react'

import './footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
        <ul className='footer-items'>
              <li><a href='/'>Home</a></li>
              <li><a href='/about'>About Us</a></li>
              <li><a href='/partners'>Partners</a></li>
              <li><a href='/contact'>Contact Us</a></li>
        </ul>
        <div className="credit">
            <p>
                Powered and <br/> Inspired by ALX
            </p>
        </div>
    </footer>
  )
}

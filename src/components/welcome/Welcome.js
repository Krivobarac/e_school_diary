import React from 'react'
import './welcome.css'
import logo from '../../assets/e-logo.png'

let Welcome = () => <div className='welcome'>
                        <h2><img src={logo} alt='logo' /><span className='logo-text'>E-SCHOOL DIARY</span></h2>
                    </div>

export default Welcome;
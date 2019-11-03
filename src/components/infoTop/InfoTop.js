import React, { Component } from 'react'
import './infoTop.css'

export default class InfoTop extends Component {
    render() {
        const {user} = this.props
        return (
            <div className='info-top'>
                <h3>School:</h3>
                <h4>"{user.school.nameSchool}"</h4>
                    <p>{
                        user.school.address.street.nameStreet
                        + ' ' + user.school.address.houseNumber.houseNumber
                        + ', ' + user.school.address.city.nameCity
                        + ', ' + user.school.address.city.borough.numberBorough
                        + ' ' + user.school.address.city.borough.nameBorough
                        + ', ' + user.school.address.city.borough.country
                    }</p>
            </div>
        )
    }
}

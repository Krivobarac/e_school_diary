import React, { Component } from 'react'
import './infoTop.css'

export default class InfoTop extends Component {
    render() {
        return (
            <div className='info-top'>
                <h3>School:</h3>
                <h4>"{this.props.user.school.nameSchool}"</h4>
                    <p>{
                        this.props.user.school.address.street.nameStreet
                        + ' ' + this.props.user.school.address.houseNumber.houseNumber
                        + ', ' + this.props.user.school.address.city.nameCity
                        + ', ' + this.props.user.school.address.city.borough.numberBorough
                        + ' ' + this.props.user.school.address.city.borough.nameBorough
                        + ', ' + this.props.user.school.address.city.borough.country
                    }</p>
            </div>
        )
    }
}

import React, { Component } from 'react'
import './schools.css'

export default class School extends Component {
    constructor(props) {
        super(props)
        this.state = {
            schools: [],
            info: null,
            result: false
        }
    }

    render() {
        return (
            <div className='schools'>
                <div>
                    {
                        this.props.user.schools.map((school, index) => {
                            return (
                                <div className='schools-info' key={index}>
                                    <h4>School {++index}:</h4>
                                    <p>School Name: {school.nameSchool}</p>
                                    <p>School Number: {school.numberSchool}</p>
                                    <p><span>Address: </span>
                                        <span>{school.address.street.nameStreet} {school.address.houseNumber.houseNumber},</span>
                                        <span>{school.address.city.nameCity}</span>
                                        <span>{school.address.city.borough.numberBorough} {school.address.city.borough.nameBorough},</span>
                                        <span>{school.address.city.borough.country}</span>
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

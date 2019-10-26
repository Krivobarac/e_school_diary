import React, { Component } from 'react'
import './parrents.css'

export default class Parrents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parrents: [],
            info: null,
            result: false
        }
        this.getParrents()
    }

    getParrents = async () => {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        const result = await fetch(`http://localhost:8080/schoolDiary/evaluation/student/${this.props.user.idUser}`, {headers:headers,})
        if(result.ok) {
            let parrents = await result.json()
            this.setState({parrents, result: true})
        } else {
            this.setState({info: 'Server doesn\'t respond, try agein later'})
        }
    }

    render() {
        return (
            <div className='parrents'>
                {this.state.result ? (
                    <div>
                        {
                            this.state.parrents[0].student.parents.map((parrent, index) => {
                                return (
                                    <div className='parrent-info' key={index}>
                                        <h4>Parrent {++index}:</h4>
                                        <p>Name: {parrent.firstName}</p>
                                        <p>Surname: {parrent.lastName}</p>
                                        <p>Jmbg: {parrent.jmbg}</p>
                                        <p>Address:
                                            <span>{parrent.address.street.nameStreet}</span>
                                            <span>{parrent.address.houseNumber.houseNumber}</span>,
                                            <span>{parrent.address.city.nameCity}</span>,
                                            <span>{parrent.address.city.borough.numberBorough}</span>
                                            <span>{parrent.address.city.borough.nameBorough}</span>,
                                            <span>{parrent.address.city.borough.country}</span>
                                        </p>
                                        <p>Gender: {parrent.gender}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : <div className="spinner">{this.state.info}</div>}
            </div>
        )
    }
}

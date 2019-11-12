import React, { Component } from 'react'
import './view.css'

export default class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update: false,
            student: null,
            info: null,
            name: this.props.user.firstName,
            surname: this.props.user.lastName,
            jmbg: this.props.user.jmbg,
            gender: this.props.user.gender,
            street: this.props.user.address.street.nameStreet,
            number: this.props.user.address.houseNumber.houseNumber,
            city: this.props.user.address.city.nameCity,
            borough: this.props.user.address.city.borough.nameBorough,
            postNumber: this.props.user.address.city.borough.numberBorough,
            schoolyear: this.props.user.schoolYear.schoolYear,
            schoolNumber: this.props.user.schoolUniqeNumber
        }
        this.getUser()
    }

    getUser = async () => {
        document.documentElement.style.setProperty('--change-color', 'white')
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        const response = await fetch(`http://localhost:8080/schoolDiary/users/student/${this.props.user.idUser}`, {headers:headers})
        if(response.ok) {
            this.setState({student: await response.json(), info: null, update: false})
        } else {
            this.setState({info: 'Server doesn\'t response, please try later again!'})
        }
    }

    saveUser = async () => {
        if(!this.checkData()) { document.documentElement.style.setProperty('--change-color', 'red'); return}
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        headers.append('Content-Type', 'application/json')
        const response = await fetch(`http://localhost:8080/schoolDiary/users/student/${this.state.student.idUser}`, {
            method: 'PUT',
            headers:headers,
            body: JSON.stringify({
                firstName: `${this.state.name}`,
                lastName: `${this.state.surname}`,
                jmbg: `${this.state.jmbg}`,
                gender: `${this.state.gender}`,
                nameStreet: `${this.state.street}`,
                houseNumber: `${this.state.number}`,
                nameCity: `${this.state.city}`,
                nameBorough: `${this.state.borough}`,
                numberBorough: `${this.state.postNumber}`,
                schoolYear: `${this.state.schoolyear}`,
                schoolNumber: `${this.state.schoolNumber}`,
                grade: 1
            })
        })
        if(response.ok) {
            this.getUser()
        } else {
            this.setState({info: 'Server doesn\'t response, please try later again!'})
        }
    }

    checkData = () => {
        if(this.state.name.size < 2 || /^\s*$/.test(this.state.name)) {this.setState({info: 'Name must be greater then 2 characters!'}); return false}
        if(this.state.surname.size < 2 || /^\s*$/.test(this.state.surname)) {this.setState({info: 'Surname must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.jmbg)) {this.setState({info: 'Jmbg must be digits!'}); return false}
        if(this.state.jmbg.length < 13 || this.state.jmbg.length > 13) {this.setState({info: 'Jmbg must contain 13 digits!'}); return false}
        if(this.state.street.size < 2 || /^\s*$/.test(this.state.street)) {this.setState({info: 'Street must be greater then 2 characters!'}); return false}
        if(this.state.number.size < 2 || /^\s*$/.test(this.state.number)) { this.setState({info: 'Street number must be greater then 2 characters!'}); return false}
        if(this.state.city.size < 2 || /^\s*$/.test(this.state.city)) {this.setState({info: 'City must be greater then 2 characters!'}); return false}
        if(this.state.borough.size < 2 || /^\s*$/.test(this.state.borough)) {this.setState({info: 'Borough must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.postNumber)) {this.setState({info: 'Post number must be digits!'}); return false}
        if(this.state.postNumber.length < 5 || this.state.postNumber.length > 6)  {this.setState({info: 'Post number must be 5 or 6 digits!'}); return false}
        return true
    }

    setData = (event) => {
        let value =  event.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.setState({[event.name]: value})
    }

    render() {
        console.log(this.state.student)
        if(!this.state.student) {return <div className='spinner-info'><div className='spinner'></div>{this.state.info}</div>}
        return (
            this.state.student
            ?   <div className='view-student'>
                {!this.state.update
                ?   <div className='student-info'>
                        <p>Name: {this.state.student.firstName}</p>
                        <p>Surname: {this.state.student.lastName}</p>
                        <p>Jmbg: {this.state.student.jmbg}</p>
                        <p>Gender: {this.state.student.gender}</p>
                        <p>Address:
                            <span>{this.state.student.address.street.nameStreet} {this.state.student.address.houseNumber.houseNumber}</span>
                            <span>{this.state.student.address.city.nameCity}</span>
                            <span>{this.state.student.address.city.borough.numberBorough} {this.state.student.address.city.borough.nameBorough}</span>
                            <span>{this.state.student.address.city.borough.country}</span>
                        </p>
                        <input type='button' onClick={() => this.setState({update: true})} value='Update' />
                    </div>
                :   <div className='student-info student-update'>
                        <p><span>Name: </span><input type='text' autoComplete='off' name='name' defaultValue={this.state.student.firstName} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Surname: </span><input type='text' autoComplete='off' name='surname' defaultValue={this.state.student.lastName} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Jmbg: </span><input type='text' maxLength="13" name='jmbg' defaultValue={this.state.student.jmbg} onChange={event => this.setData(event.target)} /></p>
                        <p>
                            <span>Gender: </span>
                            <span>male: </span>
                            <input type='radio' name='gender' value='Muski' onChange={event => this.setData(event.target)} />
                            <span>female: </span>
                            <input type='radio' name='gender' value='Zenski' onChange={event => this.setData(event.target)} />
                        </p>
                        <p>Adress:</p>
                        <p><span>Street: </span><input type='text' autoComplete='off' name='street' defaultValue={this.state.student.address.street.nameStreet} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Number: </span><input type='text' autoComplete='off' name='number' defaultValue={this.state.student.address.houseNumber.houseNumber} onChange={event => this.setData(event.target)} /></p>
                        <p><span>City: </span><input type='text' autoComplete='off' name='city' defaultValue={this.state.student.address.city.nameCity} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Borough: </span><input type='text' autoComplete='off' name='borough' defaultValue={this.state.student.address.city.borough.nameBorough} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Post Number: </span><input type='text' maxLength="6" name='postNumber' defaultValue={this.state.student.address.city.borough.numberBorough} onChange={event => this.setData(event.target)} /></p>
                        <div>
                        <input type='button' onClick={() => this.saveUser()} value='Save' />
                        </div>
                    </div>
                }
                {this.state.info && (<span className='info'>{this.state.info}</span>)}
                </div>
            : (<div className='spinner-info'><div className='spinner'></div>{this.state.info}</div>)
        )
    }
}

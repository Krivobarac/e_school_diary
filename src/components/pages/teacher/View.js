import React, { Component } from 'react'
import './view.css'

export default class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update: false,
            teacher: null,
            info: null,
            name: this.props.user.firstName,
            surname: this.props.user.lastName,
            subject: this.props.user.subject.subjectName,
            schoolNumber: this.props.user.schoolUniqeNumber,
            jmbg: this.props.user.jmbg,
            gender: this.props.user.gender,
            email: this.props.user.email,
            street: this.props.user.address.street.nameStreet,
            number: this.props.user.address.houseNumber.houseNumber,
            city: this.props.user.address.city.nameCity,
            borough: this.props.user.address.city.borough.nameBorough,
            postNumber: this.props.user.address.city.borough.numberBorough,
        }
        this.getUser()
    }

    getUser = async () => {
        document.documentElement.style.setProperty('--change-color', 'white')
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        const response = await fetch(`http://localhost:8080/schoolDiary/users/teacher/${this.props.user.idUser}`, {headers:headers})
        if(response.ok) {
            this.setState({teacher: await response.json(), info: null, update: false})
        } else {
            this.setState({info: 'Server doesn\'t response, please try later again!'})
        }
    }

    saveUser = async () => {
        if(!this.checkData()) { document.documentElement.style.setProperty('--change-color', 'red'); return}
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        headers.append('Content-Type', 'application/json')
        const response = await fetch(`http://localhost:8080/schoolDiary/users/teacher/${this.state.teacher.idUser}`, {
            method: 'PUT',
            headers:headers,
            body: JSON.stringify({
                firstName: `${this.state.name}`,
                lastName: `${this.state.surname}`,
                jmbg: `${this.state.jmbg}`,
                gender: `${this.state.gender}`,
                email: `${this.state.email}`,
                subject: `${this.state.subject}`,
                schoolNumber : `${this.state.schoolNumber}`,
                nameStreet: `${this.state.street}`,
                houseNumber: `${this.state.number}`,
                nameCity: `${this.state.city}`,
                nameBorough: `${this.state.borough}`,
                numberBorough: `${this.state.postNumber}`
            })
        })
        if(response.ok) {
            this.getUser()
        } else if(response.status === 406) {
            document.documentElement.style.setProperty('--change-color', 'red')
            this.setState({info: 'You must insert correct subject name!'})
        } else {
            console.log(response)
            this.setState({info: 'Server doesn\'t response, please try later again!'})
        }
    }

    checkData = () => {
        if(this.state.name.size < 2 || /^\s*$/.test(this.state.name)) {this.setState({info: 'Name must be greater then 2 characters!'}); return false}
        if(this.state.subject.size < 3 || /^\s*$/.test(this.state.subject)) {this.setState({info: 'Name must be greater then 3 characters!'}); return false}
        if(this.state.surname.size < 2 || /^\s*$/.test(this.state.surname)) {this.setState({info: 'Surname must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.jmbg)) {this.setState({info: 'Jmbg must be digits!'}); return false}
        if(this.state.jmbg.length < 13 || this.state.jmbg.length > 13) {this.setState({info: 'Jmbg must contain 13 digits!'}); return false}
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {this.setState({info: 'Mail is not valid!'}); return false}
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
        if(!this.state.teacher) {return <div className='spinner-info'><div className='spinner'></div>{this.state.info}</div>}
        return (
            this.state.teacher
            ?   <div className='view-teacher'>
                {!this.state.update
                ?   <div className='teacher-info'>
                        <p>Name: {this.state.teacher.firstName}</p>
                        <p>Surname: {this.state.teacher.lastName}</p>
                        <p>Subject: {this.state.teacher.subject.subjectName}</p>
                        <p>Jmbg: {this.state.teacher.jmbg}</p>
                        <p>Gender: {this.state.teacher.gender}</p>
                        <p>Email: {this.state.teacher.email}</p>
                        <p>Address:
                            <span>{this.state.teacher.address.street.nameStreet} {this.state.teacher.address.houseNumber.houseNumber},</span>
                            <span>{this.state.teacher.address.city.nameCity}</span>
                            <span>{this.state.teacher.address.city.borough.numberBorough} {this.state.teacher.address.city.borough.nameBorough},</span>
                            <span>{this.state.teacher.address.city.borough.country}</span>
                        </p>
                        <input type='button' onClick={() => this.setState({update: true})} value='Update' />
                    </div>
                :   <div className='teacher-info teacher-update'>
                        <p><span>Name: </span><input type='text' autoComplete='off' name='name' defaultValue={this.state.teacher.firstName} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Surname: </span><input type='text' autoComplete='off' name='surname' defaultValue={this.state.teacher.lastName} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Jmbg: </span><input type='text' maxLength="13" name='jmbg' defaultValue={this.state.teacher.jmbg} onChange={event => this.setData(event.target)} /></p>
                        <p>
                            <span>Gender: </span>
                            <span>male: </span>
                            <input type='radio' name='gender' value='Muski' onChange={event => this.setData(event.target)} />
                            <span>female: </span>
                            <input type='radio' name='gender' value='Zenski' onChange={event => this.setData(event.target)} />
                        </p>
                        <p><span>Email: </span><input type='text' autoComplete='off' name='email' defaultValue={this.state.teacher.email} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Subject: </span><input type='text' autoComplete='off' name='subject' defaultValue={this.state.teacher.subject.subjectName} onChange={event => this.setData(event.target)} /></p>
                        <p>Adress:</p>
                        <p><span>Street: </span><input type='text' autoComplete='off' name='street' defaultValue={this.state.teacher.address.street.nameStreet} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Number: </span><input type='text' autoComplete='off' name='number' defaultValue={this.state.teacher.address.houseNumber.houseNumber} onChange={event => this.setData(event.target)} /></p>
                        <p><span>City: </span><input type='text' autoComplete='off' name='city' defaultValue={this.state.teacher.address.city.nameCity} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Borough: </span><input type='text' autoComplete='off' name='borough' defaultValue={this.state.teacher.address.city.borough.nameBorough} onChange={event => this.setData(event.target)} /></p>
                        <p><span>Post Number: </span><input type='text' maxLength="6" name='postNumber' defaultValue={this.state.teacher.address.city.borough.numberBorough} onChange={event => this.setData(event.target)} /></p>
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

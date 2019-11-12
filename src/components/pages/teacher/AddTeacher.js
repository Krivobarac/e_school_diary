import React, { Component } from 'react'
import './addTeacher.css'

export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update: false,
            teacher: null,
            info: null,
            name: '',
            surname: '',
            jmbg: 0,
            gender: '',
            email: '',
            subject: '',
            street: '',
            number: '',
            city: '',
            borough: '',
            postNumber: 1
        }
    }

    saveUser = async () => {
        if(!this.checkData()) { document.documentElement.style.setProperty('--change-color', 'red'); return}
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        headers.append('Content-Type', 'application/json')
        const response = await fetch(`http://localhost:8080/schoolDiary/users/teacher`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify({
                firstName: `${this.state.name}`,
                lastName: `${this.state.surname}`,
                jmbg: `${this.state.jmbg}`,
                gender: `${this.state.gender}`,
                email: `${this.state.email}`,
                subject: `${this.state.subject}`,
                schoolNumber: this.props.user.school.numberSchool,
                nameStreet: `${this.state.street}`,
                houseNumber: `${this.state.number}`,
                nameCity: `${this.state.city}`,
                nameBorough: `${this.state.borough}`,
                numberBorough: `${this.state.postNumber}`
            })
        })
        if(response.ok) {
            this.props.dataCallBack('Teachers')
        } else {
            this.setState({info: 'Server doesn\'t response, please try later again!'})
        }
    }

    checkData = () => {
        if(this.state.name.length < 2 || /^\s*$/.test(this.state.name)) {this.setState({info: 'Name must be greater then 2 characters!'}); return false}
        if(this.state.surname.length < 2 || /^\s*$/.test(this.state.surname)) {this.setState({info: 'Surname must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.jmbg)) {this.setState({info: 'Jmbg must be digits!'}); return false}
        if(this.state.subject.length < 2 || /^\s*$/.test(this.state.subject)) {this.setState({info: 'Subject must be greater then 2 characters!'}); return false}
        if(this.state.jmbg.length < 13 || this.state.jmbg.length > 13) {this.setState({info: 'Jmbg must contain 13 digits!'}); return false}
        if(this.state.street.length < 2 || /^\s*$/.test(this.state.street)) {this.setState({info: 'Street must be greater then 2 characters!'}); return false}
        if(this.state.number.length < 2 || /^\s*$/.test(this.state.number)) { this.setState({info: 'Street number must be greater then 2 characters!'}); return false}
        if(this.state.city.length < 2 || /^\s*$/.test(this.state.city)) {this.setState({info: 'City must be greater then 2 characters!'}); return false}
        if(this.state.borough.length < 2 || /^\s*$/.test(this.state.borough)) {this.setState({info: 'Borough must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.postNumber)) {this.setState({info: 'Post number must be digits!'}); return false}
        if(this.state.postNumber.length < 5 || this.state.postNumber.length > 6)  {this.setState({info: 'Post number must be 5 or 6 digits!'}); return false}
        if(!/^\d*$/.test(this.state.jmbg)) {this.setState({info: 'Parent Jmbg must be digits!'}); return false}
        if(!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(this.state.email)) {this.setState({info: 'Email is not valid!'}); return false}
        return true
    }

    setData = (event) => {
        let value =  event.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.setState({[event.name]: value})
    }

    render() {
        return (
            <div className='new-teacher'>
                <div className='teacher-info'>
                    <h3>Teacher:</h3>
                    <p><span>Name: </span><input type='text'  name='name' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Surname: </span><input type='text'  name='surname' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Jmbg: </span><input type='text' maxLength="13" name='jmbg' onChange={event => this.setData(event.target)} /></p>
                    <p>
                        <span>Gender: </span>
                        <span>male: </span>
                        <input type='radio' name='gender' value='Muski' onChange={event => this.setData(event.target)} />
                        <span>female: </span>
                        <input type='radio' name='gender' value='Zenski' onChange={event => this.setData(event.target)} />
                    </p>
                    <p><span>Subject: </span><input type='text' maxLength="13" name='subject' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Email: </span><input type='text' name='email' onChange={event => this.setData(event.target)} /></p>
                    <p>Adress:</p>
                    <p><span>Street: </span><input type='text'  name='street' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Number: </span><input type='text'  name='number' onChange={event => this.setData(event.target)} /></p>
                    <p><span>City: </span><input type='text'  name='city' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Borough: </span><input type='text' name='borough' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Post Number: </span><input type='text'  maxLength="6" name='postNumber' onChange={event => this.setData(event.target)} /></p>
                    <input type='button' onClick={() => this.saveUser()} value='Save' />
                </div>
                {this.state.info && (
                    <div className='info'>
                        <span>{this.state.info}</span>
                    </div>
                )}
            </div>
        )
    }
}

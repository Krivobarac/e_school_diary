import React, { Component } from 'react'
import './addStudent.css'

export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update: false,
            student: null,
            info: null,
            name: '',
            surname: '',
            jmbg: 0,
            gender: '',
            street: '',
            number: '',
            city: '',
            borough: '',
            postNumber: 1,
            schoolyear: 1,
            grade: 0,
            parrentName: '',
            parrentSurname: '',
            parrentJmbg: 0,
            parrentEmail: '',
            parrentGender: '',
            parrentStreet: '',
            parrentNumber: '',
            parrentCity: '',
            parrentBorough: '',
            parrentPostNumber: 1
        }
    }

    saveUser = async () => {
        if(!this.checkData()) { document.documentElement.style.setProperty('--change-color', 'red'); return}
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        headers.append('Content-Type', 'application/json')
        const response = await fetch(`http://localhost:8080/schoolDiary/users/student`, {
            method: 'POST',
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
                schoolNumber: this.props.user.school.numberSchool,
                grade: `${this.state.grade}`,
                parentFirstName: `${this.state.parrentName}`,
                parentLastName: `${this.state.parrentSurname}`,
                parentJmbg: `${this.state.parrentJmbg}`,
                parentGender: `${this.state.parrentGender}`,
                parentEmail: `${this.state.parrentEmail}`,
                parentNameStreet: `${this.state.parrentStreet}`,
                parentHouseNumber: `${this.state.parrentNumber}`,
                parentNameCity: `${this.state.parrentCity}`,
                parentNameBorough: `${this.state.parrentBorough}`,
                parentNumberBorough: `${this.state.parrentPostNumber}`,
            })
        })
        if(response.ok) {
            this.props.dataCallBack('Students')
        } else {
            this.setState({info: 'Server doesn\'t response, please try later again!'})
        }
    }

    checkData = () => {
        if(this.state.name.length < 2 || /^\s*$/.test(this.state.name)) {this.setState({info: 'Name must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.grade)) {this.setState({info: 'Grade must be digits!'}); return false}
        if(this.state.name.grade < 8 || this.state.name.grade > 8 || /^\s*$/.test(this.state.grade)) {this.setState({info: 'Grade must be between 1 and 8 digit!'}); return false}
        if(this.state.surname.length < 2 || /^\s*$/.test(this.state.surname)) {this.setState({info: 'Surname must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.jmbg)) {this.setState({info: 'Jmbg must be digits!'}); return false}
        if(this.state.jmbg.length < 13 || this.state.jmbg.length > 13) {this.setState({info: 'Jmbg must contain 13 digits!'}); return false}
        if(this.state.street.length < 2 || /^\s*$/.test(this.state.street)) {this.setState({info: 'Street must be greater then 2 characters!'}); return false}
        if(this.state.number.length < 2 || /^\s*$/.test(this.state.number)) { this.setState({info: 'Street number must be greater then 2 characters!'}); return false}
        if(this.state.city.length < 2 || /^\s*$/.test(this.state.city)) {this.setState({info: 'City must be greater then 2 characters!'}); return false}
        if(this.state.borough.length < 2 || /^\s*$/.test(this.state.borough)) {this.setState({info: 'Borough must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.postNumber)) {this.setState({info: 'Post number must be digits!'}); return false}
        if(!/^[0-9]{4}\/[0-9]{4}$/.test(this.state.schoolyear)) {this.setState({info: 'Shool years must be in yyyy/yyyy format!'}); return false}
        if(this.state.postNumber.length < 5 || this.state.postNumber.length > 6)  {this.setState({info: 'Post number must be 5 or 6 digits!'}); return false}
        if(/^\s*$/.test(this.state.grade)) {this.setState({info: 'Grade is required!'}); return false}
        if(this.state.parrentName.length < 2 || /^\s*$/.test(this.state.parrentName)) {this.setState({info: 'Parent Name must be greater then 2 characters!'}); return false}
        if(this.state.parrentSurname.length < 2 || /^\s*$/.test(this.state.parrentSurname)) {this.setState({info: 'Parent Surname must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.parrentJmbg)) {this.setState({info: 'Parent Jmbg must be digits!'}); return false}
        if(this.state.parrentJmbg.length < 13 || this.state.parrentJmbg.length > 13) {this.setState({info: 'Parent Jmbg must contain 13 digits!'}); return false}
        if(this.state.parrentStreet.length < 2 || /^\s*$/.test(this.state.parrentStreet)) {this.setState({info: 'Parent Street must be greater then 2 characters!'}); return false}
        if(this.state.parrentNumber.length < 2 || /^\s*$/.test(this.state.parrentNumber)) { this.setState({info: 'Parent Street number must be greater then 2 characters!'}); return false}
        if(this.state.parrentCity.length < 2 || /^\s*$/.test(this.state.parrentCity)) {this.setState({info: 'Parent City must be greater then 2 characters!'}); return false}
        if(this.state.parrentBorough.length < 2 || /^\s*$/.test(this.state.parrentBorough)) {this.setState({info: 'Parent Borough must be greater then 2 characters!'}); return false}
        if(!/^\d*$/.test(this.state.parrentPostNumber)) {this.setState({info: 'parent Post number must be digits!'}); return false}
        if(this.state.parrentPostNumber.length < 5 || this.state.parrentPostNumber.length > 6)  {this.setState({info: 'Parent Post number must be 5 or 6 digits!'}); return false}
        if(!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(this.state.parrentEmail)) {this.setState({info: 'Grade must be digits!'}); return false}
        return true
    }

    setData = (event) => {
        let value =  event.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.setState({[event.name]: value})
    }

    render() {
        console.log(this.props.user)
        return (
            <div className='new-student'>
                <div className='student-info'>
                    <h3>Student:</h3>
                    <p><span>Name: </span><input type='text'  name='name' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Surname: </span><input type='text'  name='surname' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Jmbg: </span><input type='text' maxLength="13" name='jmbg' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Grade: </span><input type='text' maxLength="13" name='grade' onChange={event => this.setData(event.target)} /></p>
                    <p><span>School Year: </span><input type='text' maxLength="13" name='schoolyear' onChange={event => this.setData(event.target)} /></p>
                    <p>
                        <span>Gender: </span>
                        <span>male: </span>
                        <input type='radio' name='gender' value='Muski' onChange={event => this.setData(event.target)} />
                        <span>female: </span>
                        <input type='radio' name='gender' value='Zenski' onChange={event => this.setData(event.target)} />
                    </p>
                    <p>Adress:</p>
                    <p><span>Street: </span><input type='text'  name='street' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Number: </span><input type='text'  name='number' onChange={event => this.setData(event.target)} /></p>
                    <p><span>City: </span><input type='text'  name='city' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Borough: </span><input type='text' name='borough' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Post Number: </span><input type='text'  maxLength="6" name='postNumber' onChange={event => this.setData(event.target)} /></p>
                    <h3>Parent:</h3>
                    <p><span>Name: </span><input type='text' autoComplete='off' name='parrentName' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Surname: </span><input type='text' autoComplete='off' name='parrentSurname' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Jmbg: </span><input type='text'  maxLength="13" name='parrentJmbg' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Email: </span><input type='text' name='parrentEmail' onChange={event => this.setData(event.target)} /></p>
                    <p>
                        <span>Gender: </span>
                        <span>male: </span>
                        <input type='radio' name='parrentGender' value='Muski' onChange={event => this.setData(event.target)} />
                        <span>female: </span>
                        <input type='radio' name='parrentGender' value='Zenski' onChange={event => this.setData(event.target)} />
                    </p>
                    <p>Adress:</p>
                    <p><span>Street: </span><input type='text'  name='parrentStreet' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Number: </span><input type='text'  name='parrentNumber' onChange={event => this.setData(event.target)} /></p>
                    <p><span>City: </span><input type='text'  name='parrentCity' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Borough: </span><input type='text' autoComplete='off' name='parrentBorough' onChange={event => this.setData(event.target)} /></p>
                    <p><span>Post Number: </span><input type='text'  maxLength="6" name='parrentPostNumber' onChange={event => this.setData(event.target)} /></p>
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

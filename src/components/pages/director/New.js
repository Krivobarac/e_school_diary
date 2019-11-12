import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class New extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update: false,
            user: null,
            info: null,
            role: null,
            name: '',
            surname: '',
            schoolNumber: '',
            jmbg: '',
            gender: '',
            email: '',
            street: '',
            number: '',
            city: '',
            borough: '',
            postNumber: '',
        }
    }

    saveUser = async () => {
        if(!this.checkData()) { document.documentElement.style.setProperty('--change-color', 'red'); return}
        let idUser = await this.getUser()
        this.deleteUser(idUser)
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        headers.append('Content-Type', 'application/json')
        const response = await fetch(`http://localhost:8080/schoolDiary/users/${this.state.role}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify({
                firstName: `${this.state.name}`,
                lastName: `${this.state.surname}`,
                jmbg: `${this.state.jmbg}`,
                gender: `${this.state.gender}`,
                email: `${this.state.email}`,
                schoolNumber : `${this.props.user.school.numberSchool}`,
                nameStreet: `${this.state.street}`,
                houseNumber: `${this.state.number}`,
                nameCity: `${this.state.city}`,
                nameBorough: `${this.state.borough}`,
                numberBorough: `${this.state.postNumber}`
            })
        })
        if(response.ok) {
            const user = await response.json()
            if(user.account.role.role === 'ROLE_ADMIN') {
                return <Redirect to='/' />
            }
            if(user.account.role.role === 'ROLE_DIRECTOR') {
                this.props.dataCallBack('Director')
            }
        } else {
            this.setState({info: 'Server doesn\'t response, please try later again!'})
        }
    }

    getUser = async () => {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        const response = await fetch(`http://localhost:8080/schoolDiary/users/${this.state.role}/school?idSchool=${this.props.user.school.idSchool}`, {headers:headers})
        if(response.ok) {
            const user = await response.json()
            this.setState({user, info: null, update: false})
            console.log(user.idUser)
            return user.idUser
        } else {
            this.setState({info: 'Server doesn\'t response, please try later again!'})
        }
    }

    deleteUser = (idUser) => {
        const headers = new Headers()
            headers.append('Authorization', "Basic " + this.props.credentials)
            fetch(`http://localhost:8080/schoolDiary/users/${this.state.role}/${idUser}`, {headers: headers, method: "DELETE"})
    }

    checkData = () => {
        if(!this.state.role) {this.setState({info: 'You must sign user!'}); return false}
        if(this.state.name.size < 2 || /^\s*$/.test(this.state.name)) {this.setState({info: 'Name must be greater then 2 characters!'}); return false}
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
        console.log(this.state.user)
        return (
            <div className='view-user'>
                <h3>Add New</h3>
                <div >
                    <div className='user-info user-update'>
                        <div className='choose'>
                            <p>Director: <input type='radio' name='' onChange={() => this.setState({role: 'director'})} /></p>
                            <p>Admin: <input type='radio' name='' onChange={() => this.setState({role: 'admin'})} /></p>
                        </div>
                        <p><span>Name: </span><input type='text' autoComplete='off' name='name' onChange={event => this.setData(event.target)} /></p>
                        <p><span>Surname: </span><input type='text' autoComplete='off' name='surname' onChange={event => this.setData(event.target)} /></p>
                        <p><span>Jmbg: </span><input type='text' maxLength="13" name='jmbg' onChange={event => this.setData(event.target)} /></p>
                        <p>
                            <span>Gender: </span>
                            <span>male: </span>
                            <input type='radio' name='gender' value='Muski' onChange={event => this.setData(event.target)} />
                            <span>female: </span>
                            <input type='radio' name='gender' value='Zenski' onChange={event => this.setData(event.target)} />
                        </p>
                        <p><span>Email: </span><input type='text' autoComplete='off' name='email' onChange={event => this.setData(event.target)} /></p>
                        <p>Adress:</p>
                        <p><span>Street: </span><input type='text' autoComplete='off' name='street' onChange={event => this.setData(event.target)} /></p>
                        <p><span>Number: </span><input type='text' autoComplete='off' name='number' onChange={event => this.setData(event.target)} /></p>
                        <p><span>City: </span><input type='text' autoComplete='off' name='city' onChange={event => this.setData(event.target)} /></p>
                        <p><span>Borough: </span><input type='text' autoComplete='off' name='borough' onChange={event => this.setData(event.target)} /></p>
                        <p><span>Post Number: </span><input type='text' maxLength="6" name='postNumber' onChange={event => this.setData(event.target)} /></p>
                        <div>
                        <input type='button' onClick={() => this.saveUser()} value='Save' />
                        </div>
                    </div>
                </div>
                {this.state.info && (<span className='info'>{this.state.info}</span>)}
            </div>
        )
    }
}

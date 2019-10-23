import React, {Component} from 'react';
import './login.css';
import {Redirect} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoged: false,
            user: false,
            username: '',
            password: '',
            isChecked: false,
            info: false,
            newCredentials: false,
            role: '/'
        }
        document.documentElement.style.setProperty('--login-color', 'white')
        if(localStorage.getItem('username') && localStorage.getItem('password')) {
            this.state.isLoged = true
            this.state.username = localStorage.getItem('username')
            this.state.password = localStorage.getItem('password')
            this.logIn(false)
        }
    }
     
    logIn = async e => {
        e && e.preventDefault();
        if(this.state.username !== '' && this.state.password !== '' ) {
            const headers = new Headers();
            headers.append('Authorization', 'Basic ' + window.btoa(this.state.username + ':' + this.state.password))
            let user = await fetch('http://localhost:8080/schoolDiary/login', {headers: headers})
            if(user.ok) {
                if(this.state.isChecked) {
                    localStorage.setItem("username", this.state.username);
                    localStorage.setItem("password", this.state.password);
                }
                user = await user.json()
                document.documentElement.style.setProperty('--login-color', 'green')
                setTimeout(() => this.setState({user, info: 'ACCESS', role: user.account.role.role.slice(5).toLowerCase()}), 800)
            } else {
                document.documentElement.style.setProperty('--login-color', 'red');
                this.setState({info: 'Username or Password isn\'t correct'})
            }
        } else {
            document.documentElement.style.setProperty('--login-color', 'red');
            (this.state.password === '' ) && this.setState({info: 'Password is required!'});
            (this.state.username === '' ) && this.setState({info: 'Username is required!'});
        }
    }

    getCredentials = e => {
        let value = e.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.setState({[e.name]: value})
    }

    checkToggle = () => {
        this.setState({isChecked: !this.state.isChecked})
    }

    setredirect = () => {
        this.setState({newCredentials: true, info: false})
        document.documentElement.style.setProperty('--login-color', 'white')
    }

    render() {
        const {info, newCredentials, isLoged, user, role} = this.state
        if(user) return <Redirect to={{pathname:`/${role}`, state:{user: user}}}/>
        if(newCredentials) return <Redirect to={{pathname:`/newCredentials`}}/>
        return !isLoged
                ? <div className='login'>
                        <form className='login-form' onSubmit={(e) => this.logIn(e)} method='post'>
                            <h3><i className="fas fa-unlock-alt"></i> Login Form</h3>
                            <input type='text' name='username' autoComplete='off' className='fas fa-user' placeholder='&#xf007; Username' onChange={(event) => this.getCredentials(event.target)} />
                            <input type='password' name='password' autoComplete='new-password' className='fas fa-key' placeholder='&#xf084; Password' onChange={(event) => this.getCredentials(event.target)} />
                            <div className='login-footer'>
                                <p className='remember-me'>
                                    <span className='checkbox'>
                                        <input type='checkbox' name='remember-me' value='remember-me' onChange={this.checkToggle} />
                                    </span> Remeber me!
                                </p>
                                <input type='submit' value='Log In' />
                            </div>
                            <p className='forgot' onClick={this.setredirect}>Forgotten Credentials?</p>
                        </form>
                        {info && (<span className='info'>{info}</span>)}
                    </div>
                : <div className="login-spinner"></div>
    }
}

export default Login;
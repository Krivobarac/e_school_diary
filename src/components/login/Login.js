import React, {Component} from 'react';
import './login.css';
import {Redirect} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoged: false,
            user: false,
            username: false,
            password: false,
            isChecked: false,
            info: false,
            newCredentials: false,
            role: '/',
            credentials: null
        }
        document.documentElement.style.setProperty('--login-color', 'white')
        if(localStorage.getItem('credentials')) {
            this.state.isLoged = true
            this.state.username = true
            this.state.password = true
            this.logIn(false)
        } 
    }
     
    logIn = e => {
        e && e.preventDefault();
        if(this.state.username && this.state.password) {
            let credentials = (!this.state.isLoged) ? window.btoa(this.state.username + ':' + this.state.password) : localStorage.getItem('credentials')
            const headers = new Headers();
            headers.append('Authorization', 'Basic ' + credentials)
             fetch('http://localhost:8080/schoolDiary/login', {headers: headers})
            .then(async (user) => {
                if(user.ok) {
                    user =  await user.json()
                    if(this.state.isChecked) {
                        localStorage.removeItem("credentials");
                        localStorage.setItem("credentials", credentials);
                    }
                    document.documentElement.style.setProperty('--login-color', 'green')
                    this.setState({info: 'ACCESS'})
                    setTimeout(() => this.setState({credentials, user, info: 'ACCESS', role: user.account.role.role.slice(5).toLowerCase()}), 800)
                } else if(user.status === 401) {
                    document.documentElement.style.setProperty('--login-color', 'red');
                    this.setState({info: 'Username or Password isn\'t correct'})
                }
            })
            .catch((error) => {
                this.setState({info: 'Server doesn\'t respond, try again later!'})
            })
            
        } else {
            document.documentElement.style.setProperty('--login-color', 'red');
            (!this.state.password) && this.setState({info: 'Password is required!'});
            (!this.state.username) && this.setState({info: 'Username is required!'});
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
        const {info, newCredentials, isLoged, user, role, credentials} = this.state
        if(user) return <Redirect to={{pathname:`/${role}`, state:{user: user, credentials: credentials}}}/>
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
                : <div className='spinner-info'><div className='spinner'></div>{this.state.info}</div>
    }
}

export default Login;
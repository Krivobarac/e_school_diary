import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import './newCredentials.css'

export class NewCredentials extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: false,
            mail: '',
            role: '',
            isLoading: false,
            redirect: false
        }
    }

    componentDidMount() {
        document.documentElement.style.setProperty('--new-credentials-color', 'white')
    }
     
    getCredentials = async e => {
        e.preventDefault();
        if(this.state.mail !== '' && this.state.role !== '' ) {
            if(!this.state.mail.match('^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')) {
                document.documentElement.style.setProperty('--new-credentials-color', 'red');
                this.setState({info: 'Email isn\'t correct!'});
                return;
            }
            this.setState({isLoading: true, info: ''})
            const headers = new Headers();
            headers.append('Authorization', 'Basic bWFpbkVudHJ5Om1haW5FbnRyeQ==')
            headers.append('Content-Type', 'application/json')
            await fetch(`http://localhost:8080/schoolDiary/users/${this.state.role}/forgottenCredential`, {
                method: 'PUT',
                headers:headers,
                body: JSON.stringify({'email': this.state.mail})
            }).then(() => {
                document.documentElement.style.setProperty('--new-credentials-color', 'green')
                this.setState({info: 'Check your email!', isLoading: false})
            }).catch(() => {
                document.documentElement.style.setProperty('--new-credentials-color', 'red');
                this.setState({info: 'This email doesn\'t exist', isLoading: false})
            }) 
        } else {
            document.documentElement.style.setProperty('--new-credentials-color', 'red');
            (this.state.role === '' ) && this.setState({info: 'Role is required!'});
            (this.state.mail === '' ) && this.setState({info: 'Email is required!'});
        }
    }

    setRedirect = () => {
        this.setState({redirect: true})
    }

    render() {
        const {info, isLoading, redirect} = this.state
        if(redirect) return <Redirect to='/'/>
        return !isLoading
                ? (<div className='new-credentials'>
                        <form className='credentials-form' onSubmit={(e) => this.getCredentials(e)} method='post'>
                            <h3><i className="fas fa-key"></i>  New Credentials</h3>
                            <input type='text' name='mail' autoComplete='off' className='fas fa-key' placeholder='&#xf0e0; Your Email' onChange={(e) => this.setState({mail: e.target.value})} />
                            <p>Choose your role</p>
                            <div className='radio'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type='radio' id='admin' name='rolle' value='admin' onChange={(e) => this.setState({role: e.target.value})} /><label htmlFor='admin'> Admin</label>
                                            </td>
                                            <td>
                                                <input type='radio' id='director' name='rolle' value='director' onChange={(e) => this.setState({role: e.target.value})} /><label htmlFor='director'> Director</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type='radio' id='teacher' name='rolle' value='teacher' onChange={(e) => this.setState({role: e.target.value})} /><label htmlFor='teacher'> Teacher</label>
                                            </td>
                                            <td>
                                                <input type='radio' id='parrent' name='rolle' value='parrent' onChange={(e) => this.setState({role: e.target.value})} /><label htmlFor='parrent'> Parrent</label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <input type='submit' value='Send' />
                            <p>If you are a student<br />you nead to ask teacher<br />for new credentiails</p>
                            <p className='login' onClick={this.setRedirect}>Login</p>
                        </form>
                        {info && (<span className='info'>{info}</span>)}
                    </div>)
                
                : (<div className="spinner"></div>)
                
    }
}

export default NewCredentials

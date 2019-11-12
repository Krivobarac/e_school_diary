import React, { Component } from 'react'
import './changeCredentials.css'

export default class ChangeCredentials extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newUsername: '',
            newPassword: '',
            repeatPassword: '',
            mail: '',
            info: false,
        }
        document.documentElement.style.setProperty('--change-color', 'white');
    }

    change = async e => {
        e.preventDefault();
        if(this.state.newUsername !== '' && this.state.newPassword !== '' && this.state.repeatPassword !== '' ) {
            if(this.state.newPassword !== this.state.repeatPassword) {
                document.documentElement.style.setProperty('--change-color', 'red');
                this.setState({info: 'Passwords aren\'t match!'});
                return;
            }
            let role = this.props.user.account.role.role === 'ROLE_SUPER_ADMIN' ? 'sa' : this.props.user.account.role.role.slice(5).toLowerCase()
            const headers = new Headers();
            headers.append('Authorization', 'Basic ' + window.btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')))
            await fetch(`http://localhost:8080/schoolDiary/users/${role}/changeCredential/${this.props.user.idUser}`, {
                method: 'PUT',
                headers:headers,
                body: JSON.stringify({'userName': this.state.newUsername, 'password': this.state.newPassword, 'email': this.state.mail})
            }).then(() => {
                document.documentElement.style.setProperty('--change-color', 'green')
                if(this.props.user.mail) {
                    this.setState({info: 'Check yoor parrent email'})
                } else {
                    this.setState({info: 'Check yoor email'})
                }
            }).catch(error => {
                document.documentElement.style.setProperty('--change-color', 'red');
                this.setState({info: error})
            }) 
        } else {
            document.documentElement.style.setProperty('--change-color', 'red');
            (this.state.repeatPassword === '' ) && this.setState({info: 'Please repeat the password'});
            (this.state.newPassword === '' ) && this.setState({info: 'Password is required!'});
            (this.state.newUsername === '' ) && this.setState({info: 'Username is required!'});
            
        }
    }

    setCredentials = e => {
        let value = e.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.setState({[e.name]: value})
    }

    render() {
        const {info} = this.state;
        return <div className='change'>
                    <form className='change-form' onSubmit={(e) => this.change(e)}>
                        <h3><i className="fas fa-key"></i> Change Credentials</h3>
                        <input type='text' name='newUsername' autoComplete='off' className='fas fa-user' placeholder='&#xf007; Username' onChange={(event) => this.setCredentials(event.target)} />
                        <input type='password' name='newPassword' autoComplete='new-password' className='fas fa-key' placeholder='&#xf084; Password' onChange={(event) => this.setCredentials(event.target)} />
                        <input type='password' name='repeatPassword' autoComplete='new-password' className='fas fa-key' placeholder='&#xf084; Repeat Password' onChange={(event) => this.setCredentials(event.target)} />
                        <input type='submit' value='Change' />
                    </form>
                    {info && (<span className='info'>{info}</span>)}
                </div>
    }
}

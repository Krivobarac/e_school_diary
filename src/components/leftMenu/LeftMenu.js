import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './leftMenu.css'

export default class LeftMenu extends Component {
    state = {
        redirect: false
    }

    formatUsername = (username) => {
        username = username.slice(5)
        username = username.charAt(0) + username.slice(1).toLowerCase()
        return username
    }

    chooseOption = (e) => {
        this.props.dataCallBack(e.innerText)
    }

    render() {
        if(this.state.redirect) {
            let role = this.props.adminRole === 'admin' ? 'director' : this.props.adminRole
            return <Redirect  to={{pathname:`/${role}`, state:{user: this.props.user, component: this.props.component, credentials: this.props.credentials}}} />
        }
        return (
            <div className='left-menu'>
                <h3>{this.formatUsername(this.props.user.account.role.role)}</h3>
                <ul>
                    {
                        this.props.menuList.map((option, index) => {
                            return <li key={index} onClick={event => this.chooseOption(event.target)}>{option}</li>
                        })
                    }
                    {this.props.adminRole && (<li onClick={event => this.chooseOption(event.target)}>View</li>)}
                    {this.props.adminRole && (<li onClick={() => this.setState({redirect: true})}>Go Back</li>)}
                </ul>
            </div>
        )
    }
}

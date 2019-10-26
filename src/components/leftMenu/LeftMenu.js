import React, { Component } from 'react'
import './leftMenu.css'

export default class LeftMenu extends Component {

    formatUsername = (username) => {
        username = username.slice(5)
        username = username.charAt(0) + username.slice(1).toLowerCase()
        return username
    }

    chooseOption = (e) => {
        this.props.dataCallBack(e.innerText)
    }

    render() {
        return (
            <div className='left-menu'>
                <h3>{this.formatUsername(this.props.user.user.account.role.role)}</h3>
                <ul>
                    {
                        this.props.menuList.map((option, index) => {
                            return <li key={index} onClick={event => this.chooseOption(event.target)}>{option}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

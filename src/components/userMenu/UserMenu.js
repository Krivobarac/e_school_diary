import React, { Component } from 'react'
import './userMenu.css'
import ChangeCredentials from '../changeCredentials/ChangeCredentials.js';
import Profile from '../profile/Profile';
import {Redirect} from 'react-router-dom'

export class UserMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileList: ['Profile', 'Change Credentials', 'Log Out'],
            components: {'Profile': Profile,
                         'Change Credentials': ChangeCredentials
                        },
            isProfileMenu: false,
            option: Profile,
            logout: false
        }
    }

    profileMenuToggle = () => {
        this.setState({isProfileMenu: !this.state.isProfileMenu})
    }

    chooseOption = e => {
        if(e.textContent === this.state.profileList[2]) {
            localStorage.removeItem("credentials")
            this.setState({logout: true})
        }
        this.setState({option: this.state.components[e.textContent], isProfileMenu: !this.state.isProfileMenu})
        this.props.dataCallBack()
    }


    render() {
        const {user} = this.props
        const {isProfileMenu, option, profileList, logout} = this.state
        const Option = option
        if(logout) {return <Redirect to='/' />}
        return <div className='menu-wraper'>
                    {isProfileMenu && (
                        <div className='menu-list'>
                            <ul>
                                {
                                    profileList.map( (list, index) => {
                                        return <li key={index} onClick={e => this.chooseOption(e.target)}><span>{list}</span></li>
                                    })
                                }
                            </ul>
                        </div>
                    )}
                    <div className='menu'>
                        <h3 className='profile-name' onClick={this.profileMenuToggle}><i className='fas fa-user'></i><span className='name'>{user.account.userName}</span></h3>
                    </div>
                   {!this.props.toggleUserAndLeftMenu && <Option user={this.props.user} />}
                </div>
    }
}

export default UserMenu

import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import LeftMenu from '../../leftMenu/LeftMenu'
import UserMenu from '../../userMenu/UserMenu'

export default class Student extends Component {
    state = {
        menuList: ['Grades']
    }

    render() {
        if(!this.props.history.location.state) {return <Redirect to='/' />}
        return (
            <div>
                <UserMenu user={this.props.history.location.state.user}  />
                This is Student
                
                <LeftMenu />
            </div>
        )
    }
}

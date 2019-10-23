import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import UserMenu from '../../userMenu/UserMenu'

export default class SuperAdmin extends Component {
    render() {
        if(!this.props.history.location.state) {return <Redirect to='/' />}
        return (
            <div>
                <UserMenu user={this.props.history.location.state.user} />
                This is SuperAdmin
            </div>
        )
    }
}

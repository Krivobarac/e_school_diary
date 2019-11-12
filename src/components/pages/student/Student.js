import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import LeftMenu from '../../leftMenu/LeftMenu'
import UserMenu from '../../userMenu/UserMenu'
import InfoTop from '../../infoTop/InfoTop'
import Grades from './Grades'
import Parrents from './Parrents'
import './student.css'
import View from './View'
import AddParrent from './AddParrent'

export default class Student extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuList: ['Grades', 'Parrents'],
            components: {
                'Grades': Grades,
                'Parrents': Parrents,
                'View': View,
                'Add Parent': AddParrent,
                        },
            component: Grades,
            toggleUserAndLeftMenu: true
        }
        if(this.props.history.location.state.admin && this.props.history.location.state.user.parents.length < 2) {
            this.state.menuList.push("Add Parent")
        }
    }

    toggleUserAndLeftMenu = () => {
        this.setState({toggleUserAndLeftMenu: false})
    }

    callBackComponentHolder = (opt) => {
        this.setState({component: this.state.components[opt], toggleUserAndLeftMenu: true})
    }
    
    render() {
        let user, adminRole, component;
        if(!this.props.history.location.state) {
            return <Redirect to='/' />
        } else {
            component = this.props.history.location.state.component && this.props.history.location.state.component
            user = this.props.history.location.state.admin ? this.props.history.location.state.admin : this.props.history.location.state.user
            adminRole = this.props.history.location.state.admin && this.props.history.location.state.admin.account.role.role.slice(5).toLowerCase()
        }
        const Option = this.state.component
        return (
            <div className='student'>
                <UserMenu user={user} dataCallBack={this.toggleUserAndLeftMenu} toggleUserAndLeftMenu={this.state.toggleUserAndLeftMenu}/>
                <InfoTop user={this.props.history.location.state.user} />
                <LeftMenu menuList={this.state.menuList} user={user} component={component} dataCallBack={this.callBackComponentHolder} adminRole={adminRole} credentials={this.props.history.location.state.credentials} /> 
                {this.state.toggleUserAndLeftMenu && <Option user={this.props.history.location.state.user} dataCallBack={this.callBackComponentHolder} credentials={this.props.history.location.state.credentials}/>}
            </div>
        )
    }
}

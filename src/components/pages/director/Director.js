import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import UserMenu from '../../userMenu/UserMenu'
import InfoTop from '../../infoTop/InfoTop'
import LeftMenu from '../../leftMenu/LeftMenu'
import Teachers from './Teachers'
import Students from './Students'
import Parrents from './Parrents'
import AddTeacher from '../teacher/AddTeacher'
import AddStudent from '../student/AddStudent'
import View from './View'
import OtherView from './OtherView'
import New from './New'
import './director.css'

export default class Director extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuList: ['Teachers', 'Students', 'Parrents', 'Profile'],
            components: {
                'Teachers': Teachers,
                'Students': Students,
                'Parrents': Parrents,
                'AddTeacher': AddTeacher,
                'AddStudent': AddStudent,
                'Profile': View,
                'Director': OtherView,
                'Admin': OtherView,
                'New': New
                },
            option: 'Teachers',
            component: Teachers,
            toggleUserAndLeftMenu: true,
            user: null
        }
        if(this.props.history.location.state.user.account.role.role === 'ROLE_ADMIN') {
            this.state.menuList.push('Director')
            this.state.menuList.push('New')
        } else if(this.props.history.location.state.user.account.role.role === 'ROLE_DIRECTOR') {
            this.state.menuList.push('See Admin')
        }
        if(this.props.history.location.state.component) {
           this.state.component = this.state.components[this.props.history.location.state.component]
        }
    }

    toggleUserAndLeftMenu = () => {
        this.setState({toggleUserAndLeftMenu: false})
    }

    callBackComponentHolder = (opt, user) => {
        this.setState({component: this.state.components[opt], toggleUserAndLeftMenu: true, user, option: opt})
    }

    render() {
        if(!this.props.history.location.state) {return <Redirect to='/' />}
        const Option = this.state.component
        return (
            <div className='director'>
               <UserMenu user={this.props.history.location.state.user} dataCallBack={this.toggleUserAndLeftMenu} toggleUserAndLeftMenu={this.state.toggleUserAndLeftMenu}/>
                <InfoTop user={this.props.history.location.state.user} />
                <LeftMenu menuList={this.state.menuList} user={this.props.history.location.state.user} dataCallBack={this.callBackComponentHolder} credentials={this.props.history.location.state.credentials} /> 
                {this.state.toggleUserAndLeftMenu && <Option user={this.props.history.location.state.user} credentials={this.props.history.location.state.credentials} dataCallBack={this.callBackComponentHolder} component={this.state.option} student={this.state.student} />}
            </div>
        )
    }
}

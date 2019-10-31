import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './teacher.css'
import UserMenu from '../../userMenu/UserMenu'
import InfoTop from '../../infoTop/InfoTop'
import LeftMenu from '../../leftMenu/LeftMenu'
import Schools from './Schools'
import Students from './Students'
import Mark from './Mark'
import Student from './Student'

export default class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuList: ['Schools', 'Students'],
            components: {
                'Schools': Schools,
                'Students': Students,
                'Student': Student,
                'Mark': Mark
                        },
            component: Students,
            toggleUserAndLeftMenu: true,
            student: null
        }
    }

    toggleUserAndLeftMenu = () => {
        this.setState({toggleUserAndLeftMenu: false})
    }

    callBackComponentHolder = (opt, student) => {
        this.setState({component: this.state.components[opt], toggleUserAndLeftMenu: true, student})
    }

    render() {
        if(!this.props.history.location.state) {return <Redirect to='/' />}
        const Option = this.state.component
        return (
            <div className='teacher'>
               <UserMenu user={this.props.history.location.state.user} dataCallBack={this.toggleUserAndLeftMenu} toggleUserAndLeftMenu={this.state.toggleUserAndLeftMenu}/>
                {this.state.student && <InfoTop user={this.state.student} />}
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <LeftMenu menuList={this.state.menuList} user={this.props.history.location.state} dataCallBack={this.callBackComponentHolder} /> 
                    {this.state.toggleUserAndLeftMenu && <Option user={this.props.history.location.state.user} credentials={this.props.history.location.state.credentials} dataCallBack={this.callBackComponentHolder} student={this.state.student} />}
                </div>
                
            </div>
        )
    }
}

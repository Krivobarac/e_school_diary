import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import UserMenu from '../../userMenu/UserMenu'
import InfoTop from '../../infoTop/InfoTop'
import LeftMenu from '../../leftMenu/LeftMenu'
import Teachers from './Teachers'
import Students from './Students'
import Parrents from './Parrents'
import AddUser from '../../addUser/AddUser'

export default class Director extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuList: ['Teachers', 'Students', 'Parrents'],
            components: {
                'Teachers': Teachers,
                'Students': Students,
                'Parrents': Parrents,
                'AddUser': AddUser
                },
            option: 'Teachers',
            component: Teachers,
            toggleUserAndLeftMenu: true,
            user: null
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
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <LeftMenu menuList={this.state.menuList} user={this.props.history.location.state.user} dataCallBack={this.callBackComponentHolder} credentials={this.props.history.location.state.credentials} /> 
                    {this.state.toggleUserAndLeftMenu && <Option user={this.props.history.location.state.user} credentials={this.props.history.location.state.credentials} dataCallBack={this.callBackComponentHolder} component={this.state.option} student={this.state.student} />}
                </div>
            </div>
        )
    }
}

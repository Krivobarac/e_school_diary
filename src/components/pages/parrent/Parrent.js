import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './parrent.css'
import UserMenu from '../../userMenu/UserMenu'
import LeftMenu from '../../leftMenu/LeftMenu'
import Grades from '../student/Grades'
import InfoTop from '../../infoTop/InfoTop'
import View from './View'

export default class Parrent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            children: null,
            menuList: ['Children'],
            toggleUserAndLeftMenu: true,
            component: null,
            child: null,
            view: false
        }
        this.getChildren()
    }

    getChildren = async () => {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.history.location.state.credentials)
        const result = await fetch(`http://localhost:8080/schoolDiary/users/student/studentsByParrent/${this.props.history.location.state.user.idUser}`, {headers: headers})
        if(result.ok) {
            let children = await result.json()
            let menuList = []
            for(let child of children) { menuList.push(child['firstName'])}
            this.setState({children, menuList, component: children[0]['firstName'], child: children[0]})
        }
    }

    toggleUserAndLeftMenu = () => {
        this.setState({toggleUserAndLeftMenu: false, view: null})
    }

    callBackComponentHolder = async (opt) => {
        this.setState({child: null})
        if(opt === 'View') {
            this.setState({view: View, toggleUserAndLeftMenu: true})
            return
        }
        let child = this.state.children.filter(child => {
            return child.firstName === opt && child.firstName
        })
        this.setState({component: opt, toggleUserAndLeftMenu: true, child: await child[0], view: null})
    }
    
    render() {
        const {child, toggleUserAndLeftMenu} = this.state
        let user, adminRole, component;
        if(!this.props.history.location.state) {
            return <Redirect to='/' />
        } else {
            component = this.props.history.location.state.component && this.props.history.location.state.component
            user = this.props.history.location.state.admin ? this.props.history.location.state.admin : this.props.history.location.state.user
            adminRole = this.props.history.location.state.admin && this.props.history.location.state.admin.account.role.role.slice(5).toLowerCase()
        }
        return (
            <div className='student'>
                {this.state.child && <InfoTop user={child} />}
                <UserMenu user={user} dataCallBack={this.toggleUserAndLeftMenu} toggleUserAndLeftMenu={toggleUserAndLeftMenu}/>
                <LeftMenu menuList={this.state.menuList} user={user} component={component} dataCallBack={this.callBackComponentHolder} adminRole={adminRole} credentials={this.props.history.location.state.credentials} /> 
                {(toggleUserAndLeftMenu && child) && <Grades user={child} credentials={this.props.history.location.state.credentials} />}
                {this.state.view && <View user={this.props.history.location.state.user} credentials={this.props.history.location.state.credentials} />}
            </div>
        )
    }
}

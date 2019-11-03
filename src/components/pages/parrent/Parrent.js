import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './parrent.css'
import UserMenu from '../../userMenu/UserMenu'
import LeftMenu from '../../leftMenu/LeftMenu'
import Grades from '../student/Grades'
import InfoTop from '../../infoTop/InfoTop'

export default class Parrent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            children: null,
            menuList: ['Children'],
            toggleUserAndLeftMenu: true,
            component: null,
            child: null,
            user: null
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
            this.setState({children, menuList, component: children[0]['firstName'], user: children[0]})
        } else {
            alert(4)
        }
    }

    toggleUserAndLeftMenu = () => {
        this.setState({toggleUserAndLeftMenu: false})
    }

    callBackComponentHolder = async (opt) => {
        this.setState({user: null})
        let user = this.state.children.filter(child => {
            return child.firstName === opt && child.firstName
        })
        this.setState({component: opt, toggleUserAndLeftMenu: true, user: await user[0]})
    }
    
    render() {
        const {user, toggleUserAndLeftMenu, } = this.state
        if(!this.props.history.location.state) {return <Redirect to='/' />}
        return (
            <div className='student'>
                {this.state.user && <InfoTop user={user} />}
                <UserMenu user={this.props.history.location.state.user} dataCallBack={this.toggleUserAndLeftMenu} toggleUserAndLeftMenu={toggleUserAndLeftMenu}/>
                <LeftMenu menuList={this.state.menuList} user={this.props.history.location.state} dataCallBack={this.callBackComponentHolder} /> 
                {(toggleUserAndLeftMenu && user) && <Grades user={user} credentials={this.props.history.location.state.credentials}/>}
            </div>
        )
    }
}

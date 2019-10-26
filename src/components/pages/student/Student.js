import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import LeftMenu from '../../leftMenu/LeftMenu'
import UserMenu from '../../userMenu/UserMenu'
import InfoTop from '../../infoTop/InfoTop'
import Grades from './Grades'
import Parrents from './Parrents'
import './student.css'

export default class Student extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuList: ['Grades', 'Parrents'],
            components: {'Grades': Grades,
                         'Parrents': Parrents
                        },
            component: Grades,
            toggleUserAndLeftMenu: true
        }
    }

    toggleUserAndLeftMenu = () => {
        this.setState({toggleUserAndLeftMenu: !this.state.toggleUserAndLeftMenu})
    }

    callBackComponentHolder = (opt) => {
        this.setState({component: this.state.components[opt], toggleUserAndLeftMenu: true})
    }
    
    render() {
        if(!this.props.history.location.state) {return <Redirect to='/' />}
        const Option = this.state.component
        return (
            <div className='student'>
                <UserMenu user={this.props.history.location.state.user} dataCallBack={this.toggleUserAndLeftMenu} toggleUserAndLeftMenu={this.state.toggleUserAndLeftMenu}/>
                <InfoTop user={this.props.history.location.state.user} />
                <LeftMenu menuList={this.state.menuList} user={this.props.history.location.state} dataCallBack={this.callBackComponentHolder} /> 
                {this.state.toggleUserAndLeftMenu && <Option user={this.props.history.location.state.user} credentials={this.props.history.location.state.credentials}/>}
            </div>
        )
    }
}

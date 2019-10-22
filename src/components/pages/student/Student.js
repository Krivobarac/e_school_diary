import React, { Component } from 'react'
import LeftMenu from '../../leftMenu/LeftMenu'

export default class Student extends Component {
    state = {
        menuList: ['Grades']
    }

    render() {
        return (
            <div>
                
                
                <LeftMenu />
            </div>
        )
    }
}

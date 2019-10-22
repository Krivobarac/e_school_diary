import React from 'react'
import './profile.css'

function UserRow(user, users) {
    let values = {};
    console.log(user)
    for (var name in user.user) {
        if (typeof (user.user[name]) !== 'object') {
            values[name] = user.user[name]
            console.log(values)
        }
    }

    return (
        Object.keys(values).map((value, index)=> {
            return <tr key={index}>
                    <th>{value}</th>
                    <td>{values[value]}</td>
                </tr>
        })   
    )
}

let Profile = props => {
    return (
        <div className='profile'>
            <i className="fas fa-times" onClick={() => {props.ofPopUp()}}></i>
            <table>
                <tbody>
                    <UserRow user={props.user}/>
                </tbody>
            </table>
        </div>
    )
}

export default Profile;

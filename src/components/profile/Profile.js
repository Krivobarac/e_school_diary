import React from 'react'
import './profile.css'


// function getInnerdata(inner) {
//     let data = ''
//     for (var name in inner) {
//         console.log(inner[name])
//         //values[name] = typeof(user.user[name]) !== 'object' ? user.user[name] : getUserData(user.user)
//         if (typeof(inner[name]) !== 'object') {
//             data += inner[name] + ' '
//         } else {
//             data += getInnerdata(inner[name]) + ' '
//         }
//     }
//     return data
// }

// function getUserData(user) {
//     for (var name in user.user) {
//         console.log(user.user[name])
//         //values[name] = typeof(user.user[name]) !== 'object' ? user.user[name] : getUserData(user.user)
//         if (typeof(user.user[name]) !== 'object') {
//             values[name] = user.user[name]
//         } else {
//             values[name] = getInnerdata(user.user[name])
//         }
//     }
// }

function UserRow(user) {
    return Object.keys(user.user).map((value, index) => {
        if(user.user[value] !== null) {
            return <tr key={index}>
                        <th>{value}: </th>
                        <td> {user.user[value]}</td>
                    </tr>
        } else return null
    })
}

class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            isLoad: true,
            user: null
        }
        this.getUserData()
    }
    
    getUserData = async () => {
        const headers = new Headers();
        headers.append('Authorization', 'Basic bWFpbkVudHJ5Om1haW5FbnRyeQ==')
        const user = await fetch(`http://localhost:8080/schoolDiary/users/${this.props.user.account.role.role.slice(5).toLowerCase()}/userinfo/${this.props.user.idUser}`, {headers:headers,})
        if(user.ok) {
            this.setState({user: await user.json(), isLoad: false})
        }
    }

    render() {
        return  !this.state.isLoad
                ? <div className='profile'>
                    {/* <span className='out'><i className="fas fa-times" onClick={() => this.props.ofPopUp()}></i></span> */}
                    <table>
                        <tbody>
                            <UserRow user={this.state.user}/>
                        </tbody>
                    </table>
                </div>
                : <div className='spinner'></div>
    }
}

export default Profile;

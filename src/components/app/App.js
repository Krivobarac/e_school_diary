import React from 'react';
import './App.css';
import Login from '../login/Login';
import Welcome from '../welcome/Welcome';
import UserMenu from '../userMenu/UserMenu'
import Student from '../pages/student/Student'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      user: null,
      data: null,
    }
  }
  
  handleBackUserCredential = (username, password, user) => {
    this.setState({username, password, user});
    //this.fetchData()
  }

  //  fetchData = async () => {
  //   if(!this.state.user) {
  //     const headers = new Headers();
  //     headers.append('Authorization', 'Basic ' + window.btoa(this.state.username + ':' + this.state.password))
  //     const data = await fetch('http://localhost:8080/schoolDiary/' + endPoint, {headers: headers})
  //     if(data.ok) {
  //       return await data.json()
  //     } else {
  //       return null;
  //     }
  //   }
  // }

  render() {
    const {user} = this.state;
    return (
      <div className="App">
          <Welcome />
        {
          (!user)
          ? (<Login dataCallBack={this.handleBackUserCredential} />)
          : (
            <div>
              <UserMenu user={user} dataCallBack={this.handleBackUserCredential} />
              
              {user.account.role.role === 'ROLE_SUPER_ADMIN' && (<Student user={user} />)}
              {user.account.role.role === 'ROLE_ADMIN' && (<Student user={user} />)}
              {user.account.role.role === 'ROLE_TEACHER' && (<Student user={user} />)}
              {user.account.role.role === 'ROLE_PARRENT' && (<Student user={user} />)}
              {user.account.role.role === 'ROLE_STUDENT' && (<Student user={user} />)}
            </div>
            
          )
        }
      </div>
    );
  }
}

export default App;

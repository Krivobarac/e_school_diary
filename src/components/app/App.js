import React from 'react';
import './App.css';
import Login from '../login/Login';
import Welcome from '../welcome/Welcome';
import SuperAdmin from '../pages/superAdmin/SuperAdmin'
import Director from '../pages/director/Director'
import Teacher from '../pages/teacher/Teacher'
import Parrent from '../pages/parrent/Parrent'
import Student from '../pages/student/Student'
import NotFound from '../pages/notFound/NotFound'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NewCredentials from '../newCredentials/NewCredentials';

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

  render() {
    return <div className="App">
              <Welcome />
              <Router>
                <Switch>
                    <Route exact path='/' component={() => <Login />} />)
                    <Route path='/newCredentials' component={() => <NewCredentials />} />)
                    <Route path='/superadmin' component={(props) => <SuperAdmin {...props} />} />
                    <Route path='/director' component={(props) => <Director {...props} />} />
                    <Route path='/director' component={(props) => <Teacher {...props} />} />
                    <Route path='/parrent' component={(props) => <Parrent {...props} />} />
                    <Route path='/student' component={(props) => <Student {...props} />}  />
                    <Route component={NotFound} />
                </Switch>
              </Router>
            </div>
  }
              
}


export default App;

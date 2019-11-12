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

function App() {
  return <div className="App">
            <Welcome />
            <div className='app-route'>
              <Router>
                <Switch>
                    <Route exact path='/' component={() => <Login />} />)
                    <Route path='/newCredentials' component={() => <NewCredentials />} />
                    <Route exact path='/superadmin' component={(props) => <SuperAdmin {...props} />} />
                    <Route exact path={['/director', '/admin']} component={(props) => <Director {...props} />} />
                    <Route path={['/teacher', '/director/teacher', '/admin/teacher']} component={(props) => <Teacher {...props} />} />
                    <Route path={['/parrent', '/director/parrent', '/admin/parrent']} component={(props) => <Parrent {...props} />} />
                    <Route path={['/student', '/director/student', '/admin/student']} component={(props) => <Student {...props} />} />
                    <Route component={NotFound} />
                </Switch>
              </Router>
            </div>
          </div>
}

export default App;

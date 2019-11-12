import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './teachers.css'

export default class Teachers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: [],
            teachersHolder: [],
            info: null,
            result: false,
            teacherProfile: false,
            teacher: null,
            title: 'Surname: ',
            value: null,
            openTeacher: false,
            signDelete: false,
            deleted: null
        }
        this.getTeachers()
    }

    getTeachers = async () => {
        const headers = new Headers()
        headers.append('Authorization', "Basic " + this.props.credentials)
        let teachers = await fetch(`http://localhost:8080/schoolDiary/users/teacher/school?schoolNumber=${this.props.user.school.numberSchool}`, {headers: headers})
        if(teachers.ok) {
            teachers = await teachers.json()
            teachers = teachers.filter(teacher => teacher.deletedAt === null)
            this.setState({teachers, teachersHolder: teachers, result: true, signDelete: false, deleted: null})
        } else {
            this.setState({info: "Server doesn't respond, try again later!"})
        }
    }

    openTeacher = (teacher) => {
        this.setState({teacher, signDelete: false, deleted: null})
    }

    searchBy = (e) => {
        let value = !this.state.value ? e.value : e.value.substr(this.state.title.length)
        this.setState({value: {value: this.state.title + value}, teachersHolder: this.getBySearch(value), deleted: null})
        
    }

    getBySearch = (reg) => {
        let teachers = []
        let obj = null
        let by = {'Name: ': 'firstName', 'Surname: ': 'lastName', 'Subject: ': 'subject'}
        this.state.teachers.map((teacher) => {
            obj = typeof teacher[by[this.state.title]] !== 'object' ? teacher[by[this.state.title]]
            : teacher[by[this.state.title]]['subjectName']
            return obj.match(new RegExp(reg, 'i')) && teachers.push(teacher)
        })
        return teachers
    }

    signDelete = async () => {
        this.setState({signDelete: true})
        if(this.state.deleted) {
            const headers = new Headers()
            headers.append('Authorization', "Basic " + this.props.credentials)
            fetch(`http://localhost:8080/schoolDiary/users/teacher/${this.state.deleted.idUser}`, {headers: headers, method: "DELETE"})
            .then(response => {this.getTeachers()})
            .catch(error => this.setState({info: "Server doesn't respond, try again later!"}))
        }
    }

    render() {
        if(this.state.teacher) {return <Redirect  to={{pathname:`/${this.props.user.account.role.role.slice(5).toLowerCase()}/teacher`, state:{user: this.state.teacher, component: this.props.component, admin:this.props.user, credentials: this.props.credentials}}} />}
        return (
            <div>
            {this.state.result
                ? (<div className='teachers'>
                    <input className='search fas fa-search' type='text' placeholder='&#xf002; Search By (choose title)' onChange={(event) => this.searchBy(event.target)} {...this.state.value} />
                    <div className='control'>
                        <button onClick={() => this.props.dataCallBack('AddTeacher')}>Add New</button>
                        <h3>Teachers</h3>
                        <button onClick={this.signDelete}>Delete</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Name</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Surname</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        this.state.teachersHolder.map((teacher, index) => {
                        return (
                                <tr key={index}>
                                    <td onClick={() => this.openTeacher(teacher)}>{teacher.firstName}</td>
                                    <td onClick={() => this.openTeacher(teacher)}>{teacher.lastName}</td>
                                    <td onClick={() => this.openTeacher(teacher)}>{teacher.subject.subjectName}</td>
                                    {this.state.signDelete && <td className='delete'><input type='radio' name='delete' onChange={() => {this.setState({deleted: teacher})}} /></td>}
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </table>
                </div>
                ) : (<div className='spinner-info'><div className='spinner'></div>{this.state.info}</div>)}
            </div>
        )
    }
}

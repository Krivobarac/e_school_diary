import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './students.css'

export default class Students extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            studentsHolder: [],
            info: null,
            result: false,
            studentProfile: false,
            student: null,
            title: 'Surname: ',
            value: null,
            signDelete: false,
            deleted: null
        }
        this.getStudents()
    }

    getStudents = async () => {
        const headers = new Headers()
        headers.append('Authorization', "Basic " + this.props.credentials)
        let students = await fetch(`http://localhost:8080/schoolDiary/users/student/school?schoolNumber=${this.props.user.school.numberSchool}`, {headers: headers})
        if(students.ok) {
            students = await students.json()
            students = students.filter(student => student.deletedAt === null)
            this.setState({students, studentsHolder: students, result: true, signDelete: false, deleted: null})
        } else {
            this.setState({info: "Server doesn't respond, try again later!"})
        }
    }

    openStudent = (student) => {
        this.setState({student, signDelete: false, deleted: null})
    }

    searchBy = (e) => {
        let value = !this.state.value ? e.value : e.value.substr(this.state.title.length)
        this.setState({value: {value: this.state.title + value}, studentsHolder: this.getBySearch(value), deleted: null})
        
    }

    getBySearch = (reg) => {
        let students = []
        let obj = null
        let by = {'Name: ': 'firstName', 'Surname: ': 'lastName', 'Gender: ': 'gender', 'Class: ': 'classDepartments'}
        this.state.students.map((student) => {
            obj = typeof student[by[this.state.title]] !== 'object' ? student[by[this.state.title]]
            : student[by[this.state.title]][0]['schoolClass']
            return obj.match(new RegExp(reg, 'i')) && students.push(student)
        })
        return students
    }

    signDelete = async () => {
        this.setState({signDelete: true})
        if(this.state.deleted) {
            const headers = new Headers()
            headers.append('Authorization', "Basic " + this.props.credentials)
            fetch(`http://localhost:8080/schoolDiary/users/student/${this.state.deleted.idUser}`, {headers: headers, method: "DELETE"})
            .then(response => {this.getStudents()})
            .catch(error => this.setState({info: "Server doesn't respond, try again later!"}))
        }
    }

    render() {
        if(this.state.student) {return <Redirect  to={{pathname:`/${this.props.user.account.role.role.slice(5).toLowerCase()}/student`, state:{user: this.state.student, component: this.props.component, admin:this.props.user, credentials: this.props.credentials}}} />}
        return (
            <div>
            {this.state.result
                ? (<div className='students'>
                    <input className='search fas fa-search' type='text' placeholder='&#xf002; Search By (choose title)' onChange={(event) => this.searchBy(event.target)} {...this.state.value} />
                    <div className='control'>
                        <button onClick={() => this.props.dataCallBack('AddStudent')}>Add New</button>
                        <h3>Students</h3>
                        <button onClick={this.signDelete}>Delete</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Name</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Surname</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Gender</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Class</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.studentsHolder.map((student, index) => {
                        return (
                                <tr key={index}>
                                    <td onClick={() => this.openStudent(student)}>{student.firstName}</td>
                                    <td onClick={() => this.openStudent(student)}>{student.lastName}</td>
                                    <td onClick={() => this.openStudent(student)}>{student.gender}</td>
                                    <td onClick={() => this.openStudent(student)}>{student.classDepartments[0]['schoolClass']}/{student.classDepartments[0]['department']}</td>
                                    {this.state.signDelete && <td className='delete'><input type='radio' name='delete' onChange={() => {this.setState({deleted: student})}} /></td>}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                ) : (<div className='spinner-info'><div className='spinner'></div>{this.state.info}</div>)}
            </div>
        )
    }
}

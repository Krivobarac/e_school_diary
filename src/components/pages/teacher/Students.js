import React, { Component } from 'react'
import './students.css'

export default class Students extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            info: null,
            result: false,
            studentProfile: false,
            mark: false,
            student: null
        }
    }

    async componentDidMount() {
        const headers = new Headers()
        headers.append('Authorization', "Basic " + this.props.credentials)
        const students = await fetch(`http://localhost:8080/schoolDiary/users/student/studentsByTeacher/9`, {headers: headers})
        if(students.ok) {
            this.setState({students: await students.json(), result: true})
        } else {
            this.setState({info: "Server doesn't respond, try again later!"})
        }
    }

    toggleMark = (student) => {
        this.setState({mark: !this.state.mark, student})
    }

    renderMarkOrView = (option, student) => {
        this.props.dataCallBack(option, student)
    }

    render() {
        return (
            <div>
            {this.state.result
                ? (<div className='students'>
                     <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Gender</th>
                                    <th>Class</th>
                                    <th>School</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.students.map((student, index) => {
                            return (
                                    <tr key={index}>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.classDepartments[0].schoolClass}/{student.classDepartments[0].department}</td>
                                        <td>{student.school.nameSchool}</td>
                                        <td>
                                            <button onClick={() => this.renderMarkOrView('Student', student)}>View</button>
                                            <button onClick={() => this.renderMarkOrView('Mark', student)}>Mark</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                ) : <div className='spinner'>{this.state.info}</div>}
            </div>
        )
    }
}

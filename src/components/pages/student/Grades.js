import React, { Component } from 'react'
import './grades.css'

export default class Grade extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grades: [],
            info: null,
            result: false
        }
        this.getGrades()
    }
    

    getGrades = async () => {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        const result = await fetch(`http://localhost:8080/schoolDiary/evaluation/student/${this.props.user.idUser}`, {headers:headers,})
        if(result.ok) {
            let grades = await result.json()
            this.setState({grades, result: true})
        } else {
            this.setState({info: 'Server doesn\'t respond, try agein later'})
        }
    }

    render() {
        return (
            <div className='grades'>
                {this.state.result ? (
                    <div>
                        <h4>
                            <span>Class: {this.state.grades[0].student.classDepartments[0].schoolClass + '/' + this.state.grades[0].student.classDepartments[0].department}</span>
                            <span>School year: {this.state.grades[0].student.classDepartments[0].schoolYear.schoolYear}</span>
                            <span>School number: {this.state.grades[0].student.schoolUniqeNumber}</span>
                        </h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Grade</th>
                                    <th>Teacher</th>
                                    <th>Semester</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.grades.map((grade, index) => {
                            return (
                                    <tr key={index}>
                                        <td>{grade.subject.subjectName}</td>
                                        <td>{grade.mark}</td>
                                        <td>{grade.teacher.firstName} {grade.teacher.lastName}</td>
                                        <td>{grade.semester}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                ) : <div className='spinner'>{this.state.info}</div>}
            </div>
        )
    }
}

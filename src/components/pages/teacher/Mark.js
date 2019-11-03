import React, { Component } from 'react'
import './mark.css'

export default class Mark extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grades: [],
            info: null,
            result: false,
            mark: null,
            marked: false,
            deleting: false,
            deleteOption: null
        }
        this.getGrades()
    }

    getGrades = async () => {
        console.log(this.props.student.idUser)
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        const result = await fetch(`http://localhost:8080/schoolDiary/evaluation/student/${this.props.student.idUser}`, {headers:headers})
        if(result.ok) {
            let grades = await result.json()
            this.setState({grades, result: true})
        } else {
            this.setState({info: 'Server doesn\'t respond, try agein later'})
        }
    }

    mark = () => {
        this.setState({marked: !this.state.marked, deleting: false})
        this.state.mark && this.setMark()
    }

    setMark = async () => {
        this.setState({result: false})
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        await fetch(`http://localhost:8080/schoolDiary/evaluation/student/${this.props.student.idUser}?mark=${this.state.mark}`, {headers:headers , method: 'POST'})
        .then(respond => {
            this.setState({mark: null, result: true});
            this.getGrades()
        })
        .catch(error => (this.setState({info: 'Server doesn\'t respond, try again later'})))
    }

    delete = () => {
        this.setState({deleting: true, marked: false})
        this.state.deleteOption && this.deleteMark()
    }

    deleteMark = async () => {
        this.setState({result: false})
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.props.credentials)
        await fetch(`http://localhost:8080/schoolDiary/evaluation/${this.state.deleteOption}/student/${this.props.student.idUser}`, {headers:headers , method: 'DELETE'})
        .then(respond => {
            this.setState({deleteOption: null, result: true});
            this.getGrades()
        })
        .catch(error => (this.setState({info: 'Server doesn\'t respond, try again later'})))
    }

    render() {
        return (
            <div>
                {this.state.result
                ? (<div className='marks'>
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
                                    <th>Grades</th>
                                    <th>Teacher</th>
                                    <th>Semester</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.grades[0].subject.subjectName}</td>
                                    <td>
                                    {this.state.grades.map((grade, index) => {
                                        return (
                                            <span key={index}>
                                                {this.state.deleting && <input type='radio' name='grade' value={grade.idEvalueted} onChange={(event) => this.setState({deleteOption: event.target.value})} />}      
                                                <span>{grade.mark}</span>
                                            </span>
                                        )
                                    })}
                                    {this.state.marked
                                        && <select defaultValue='Grade' onChange={(event => this.setState({mark: event.target.value}))}>
                                            <option disabled>Grade</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>}
                                    </td>
                                    <td>{this.state.grades[0].teacher.firstName} {this.state.grades[0].teacher.lastName}</td>
                                    <td>{this.state.grades[0].semester}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='buttons'>
                            <button onClick={() => this.delete()} >Delete</button>
                            <button onClick={() => this.mark()}>Mark</button>
                        </div>           
                    </div>
                    </div>
                ) : (<div className='spinner-info'><div className='spinner'></div>{this.state.info}</div>)}
            </div>
        )
    }
}

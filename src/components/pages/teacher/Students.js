import React, { Component } from 'react'
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
            mark: false,
            student: null,
            title: 'Surname: ',
            value: null
        }
    }

    component

    async componentDidMount() {
        const headers = new Headers()
        headers.append('Authorization', "Basic " + this.props.credentials)
        let students = await fetch(`http://localhost:8080/schoolDiary/users/student/studentsByTeacher/9`, {headers: headers})
        if(students.ok) {
            students = await students.json()
            this.setState({students, studentsHolder: students ,result: true})
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

    searchBy = (e) => {
        let value = !this.state.value ? e.value : e.value.substr(this.state.title.length)
        this.setState({value: {value: this.state.title + value}, studentsHolder: this.getBySearch(value)})
        
    }

    getBySearch = (reg) => {
        let students = []
        let obj = null
        let by = {'Name: ': 'firstName', 'Surname: ': 'lastName', 'Gender: ': 'gender', 'Class: ': 'classDepartments', 'School: ': 'school'}
        this.state.students.map((student) => {
            obj = typeof student[by[this.state.title]] !== 'object' ? student[by[this.state.title]]
            : obj = this.state.title === 'Class: ' ? student[by[this.state.title]][0]['schoolClass'] : student[by[this.state.title]].nameSchool
            return obj.match(new RegExp(reg, 'i')) && students.push(student)
        })
        return students
    }

    render() {
        return (
            <div>
            {this.state.result
                ? (<div className='students'>
                    <input className='search fas fa-search' type='text' placeholder='&#xf002; Search By (choose title)' onChange={(event) => this.searchBy(event.target)} {...this.state.value} />
                    <table>
                        <thead>
                            <tr>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Name</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Surname</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Gender</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Class</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>School</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.studentsHolder.map((student, index) => {
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
                ) : <div className='spinner'>{this.state.info}</div>}
            </div>
        )
    }
}

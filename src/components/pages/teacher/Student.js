import React, { Component } from 'react'
import './student.css'

export default class Student extends Component {
    render() {
        const {student} = this.props
        let border;
        return (
            <div className='teacher-student'>
                <div className='student-view'>
                    <h2>Student</h2>
                    <p>Name: {student.firstName}</p>
                    <p>Surname: {student.lastName}</p>
                    <p>Jmbg: {student.jmbg}</p>
                    <p>Gender: {student.gender}</p>
                    <p>Address:
                        <span>{student.address.street.nameStreet}</span>
                        <span>{student.address.houseNumber.houseNumber}</span>,
                        <span>{student.address.city.nameCity}</span>,
                        <span>{student.address.city.borough.numberBorough}</span>
                        <span>{student.address.city.borough.nameBorough}</span>,
                        <span>{student.address.city.borough.country}</span>
                    </p>
                    <p>School Number: {student.schoolUniqeNumber}</p>
                    <p>Class: {student.classDepartments[0].schoolClass}/{student.classDepartments[0].department}</p>
                    <p>School Year: {student.schoolYear.schoolYear}</p>
                    <p>School: {student.school.nameSchool}</p>
                    <p>School Address:
                        <span>{student.school.address.street.nameStreet}</span>
                        <span>{student.school.address.houseNumber.houseNumber}</span>,
                        <span>{student.school.address.city.nameCity}</span>,
                        <span>{student.school.address.city.borough.numberBorough}</span>
                        <span>{student.school.address.city.borough.nameBorough}</span>,
                        <span>{student.school.address.city.borough.country}</span>
                    </p>
                </div>
                <div className='parrents-view'>
                {
                    student.parents.map((parrent, index) => {
                        (student.parents.length > 1 && index < 1) ? border = '1px solid white' : border=''
                        return <div className='parrent' style={{borderRight: border}} key={index}>
                            <h2>Parrent</h2>
                            <p>Name: {parrent.firstName}</p>
                            <p>Surname: {parrent.lastName}</p>
                            <p>Jmbg: {parrent.jmbg}</p>
                            <p>Gender: {parrent.gender}</p>
                            <p>Address:
                                <span>{parrent.address.street.nameStreet}</span>
                                <span>{parrent.address.houseNumber.houseNumber}</span>,
                                <span>{parrent.address.city.nameCity}</span>,
                                <span>{parrent.address.city.borough.numberBorough}</span>
                                <span>{parrent.address.city.borough.nameBorough}</span>,
                                <span>{parrent.address.city.borough.country}</span>
                            </p>
                        </div>
                    })
                }
                </div>
            </div>
        )
    }
}

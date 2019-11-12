import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './parrents.css'

export default class Parrents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parrents: [],
            parrentsHolder: [],
            info: null,
            result: false,
            parrentProfile: false,
            parrent: null,
            title: 'Surname: ',
            value: null,
            signDelete: false,
            deleted: null
        }
        this.getParents()
    }

    getParents = async () => {
        const headers = new Headers()
        headers.append('Authorization', "Basic " + this.props.credentials)
        let parrents = await fetch(`http://localhost:8080/schoolDiary/users/parrent/childSchool?schoolNumber=${this.props.user.school.numberSchool}`, {headers: headers})
        if(parrents.ok) {
            parrents = await parrents.json()
            parrents = parrents.filter(parrent => parrent.deletedAt === null)
            this.setState({parrents, parrentsHolder: parrents, result: true, deleted: null, signDelete: null})
        } else {
            this.setState({info: "Server doesn't respond, try again later!"})
        }
    }

    openParrent = (parrent) => {
        this.setState({parrent, deleted: null, signDelete: null})
    }

    searchBy = (e) => {
        let value = !this.state.value ? e.value : e.value.substr(this.state.title.length)
        this.setState({value: {value: this.state.title + value}, parrentsHolder: this.getBySearch(value), deleted: null})
        
    }

    getBySearch = (reg) => {
        let parrents = []
        let obj = null
        let by = {'Name: ': 'firstName', 'Surname: ': 'lastName', 'Gender: ': 'gender', 'Class: ': 'classDepartments', 'School: ': 'school'}
        this.state.parrents.map((parrent) => {
            obj = typeof parrent[by[this.state.title]] !== 'object' ? parrent[by[this.state.title]]
            : obj = this.state.title === 'Class: ' ? parrent[by[this.state.title]][0]['schoolClass'] : parrent[by[this.state.title]].nameSchool
            return obj.match(new RegExp(reg, 'i')) && parrents.push(parrent)
        })
        return parrents
    }

    signDelete = async () => {
        this.setState({signDelete: true})
        if(this.state.deleted) {
            const headers = new Headers()
            headers.append('Authorization', "Basic " + this.props.credentials)
            fetch(`http://localhost:8080/schoolDiary/users/parrent/${this.state.deleted.idUser}`, {headers: headers, method: "DELETE"})
            .then(response => {this.getParents()})
            .catch(error => this.setState({info: "Server doesn't respond, try again later!"}))
        }
    }


    render() {
        if(this.state.parrent) {return <Redirect  to={{pathname:`/${this.props.user.account.role.role.slice(5).toLowerCase()}/parrent`, state:{user: this.state.parrent, admin:this.props.user, component: this.props.component, credentials: this.props.credentials}}} />}
        return (
            <div>
            {this.state.result
                ? (<div className='parrents'>
                    <input className='search fas fa-search' type='text' placeholder='&#xf002; Search By (choose title)' onChange={(event) => this.searchBy(event.target)} {...this.state.value} />
                    <div className='control'>
                        <div></div>
                        <h3>Parrents</h3>
                        <button onClick={this.signDelete}>Delete</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Name</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Surname</th>
                                <th onClick={(e) => this.setState({value: {value: e.target.innerText + ': '}, title: e.target.innerText + ': '})}>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.parrentsHolder.map((parrent, index) => {
                        return (
                                <tr key={index}>
                                    <td onClick={() => this.openParrent(parrent)}>{parrent.firstName}</td>
                                    <td onClick={() => this.openParrent(parrent)}>{parrent.lastName}</td>
                                    <td onClick={() => this.openParrent(parrent)}>{parrent.gender}</td>
                                    {this.state.signDelete && <td className='delete'><input type='radio' name='delete' onChange={() => {this.setState({deleted: parrent})}} /></td>}
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

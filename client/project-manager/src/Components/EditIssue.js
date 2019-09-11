import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Breadcrumb from './Breadcrumb'

export default class EditIssue extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            description: '',
            users: [],
            loggedBy: '',
            resolved: '',
            resolvedBy: '',
            severity: '',
            issue: {},
            id: '',
            projectId: ''
        }
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        Promise.all([
        fetch(`http://localhost:5000/api/issues/${this.props.match.params.id}`).then(value=> value.json()),
        fetch('http://localhost:5000/api/users').then(value=> value.json())
        ]).then((response) => {
            this.setState({
                issue: response[0],
                users: response[1],
                name: response[0].name,
                loggedBy: response[0].loggedBy,
                description: response[0].description,
                severity: response[0].severity,
                resolved: response[0].resolved,
                id: response[0].id,
                projectId: response[0].projectId
            });
        }).catch(error => console.log(error));
    }

    handleSubmit = (event) => {
        const {name,loggedBy,description,severity, id, projectId, resolvedBy, resolved} = this.state;
        event.preventDefault();
        fetch(`http://localhost:5000/api/issues/${this.props.match.params.id}`,{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, description, loggedBy, severity, id, projectId, resolvedBy, resolved})
        }).then(response => response.json())
        .catch(error => console.log(error));

        this.setState({
            name: '',
            loggedBy: '',
            description: '',
            resolved: '',
            severity: '',
            resolvedDate: '',
            resolvedBy: '',
        });
    }

    render() {
        return (
            <div>
                <Breadcrumb name='Edit Issue'/>
                <div className="mx-auto text-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row justify-content-center">
                            <label>
                                Issue Name
                                <input placeholder="Issue Name" className="form-control" type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Issue Description
                                <textarea placeholder="Enter a short issue description" maxLength="200" cols="50" rows="4" className="form-control" value={this.state.description} name="description" onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Logged By
                                <select name="loggedBy" className="form-control" value={this.state.loggedBy} onChange={this.handleChange}>
                                    <option> </option>
                                    {this.state.users.map(user => {
                                        return <option key={user.id}>{user.name}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Severity
                                <select name="severity" className="form-control" value={this.state.severity} onChange={this.handleChange}>
                                    <option></option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Resolved
                                <select name="resolved" className="form-control" value={this.state.resolved} onChange={this.handleChange}>
                                    <option></option>
                                    <option>true</option>
                                    <option>false</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Resolved By
                                <select name="resolvedBy" className="form-control" value={this.state.resolvedBy} onChange={this.handleChange}>
                                    <option> </option>
                                    {this.state.users.map(user => {
                                        return <option key={user.id}>{user.name}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="row justify-content-center">
                            <input type="submit" className="btn btn-secondary" value="Update" />
                        </div>
                    </form>
                    <Link className="text-white float-right btn btn-primary" to={`/project/${this.state.projectId}`}> Back </Link>
                </div>
            </div>
        )
    }
}

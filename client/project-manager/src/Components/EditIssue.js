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
            projectId: '',
            errors : [],
            success: null,
            failed: null 
        }
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }

    validateForm = () => {
        let errors = [];
            
        if (this.state.name === '') {
            errors.push('Name Is Required'); 
        }
              
        if (this.state.loggedBy === '') {
             errors.push('Logger Name Is Required');
        }
               
        if (this.state.description === '') { 
            errors.push('Description Is Required'); 
        }
              
        if (this.state.severity === '') {
             errors.push('Severity Is Required'); 
        }

        if (this.state.resolved === 'true' && this.state.resolvedBy === '' ) {
            errors.push('Must Confirm Who Resolved The Issue');
        }

        this.setState({
            errors: errors
        });

       return errors;
               
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
                resolvedBy: response[0].resolvedBy === null ? '' : response[0].resolvedBy,
                id: response[0].id,
                projectId: response[0].projectId
            });
        }).catch(error => console.log(error));
    }

    handleSubmit = (event) => {
        const {name,loggedBy,description,severity, id, projectId, resolvedBy, resolved} = this.state;
        event.preventDefault();
        if (this.validateForm().length < 1) {
            fetch(`http://localhost:5000/api/issues/${this.props.match.params.id}`,{
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, description, loggedBy, severity, id, projectId, resolvedBy, resolved})
            }).then(response => {
                if (response.status === 204) {
                    this.setState({
                        success:true
                    });
                }
            })
            .catch(error => {
                this.setState({
                    failed:true
                });
                console.log(error);
            });

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
    }

    render() {
        return (
            <div>
                <Breadcrumb name='Edit Issue'/>
                <div className="mx-auto text-center">
                {this.state.errors.length > 0 && this.state.errors.map((error, i) => {
                    return (<div className='alert alert-danger' key={i}>{error}</div>)
                })}
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
                    {this.state.success ? <div className='alert mt-3 alert-success'>Issue Updated!</div> : null}
                    {this.state.failed ? <div className='alert mt-3 alert-danger'>Oops Something Went Wrong</div> : null}
                    <Link className="text-white float-right btn btn-primary" to={`/project/${this.state.projectId}`}> Back </Link>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'

import {Link} from 'react-router-dom'

export default class CreateIssue extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: '',
            loggedBy: '',
            users: [],
            description: '',
            severity: '' ,
            projectId: '',
            project: {},
            errors: [],
            success: null,
            failed: null
        }
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }

    validateForm = () =>  {
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

        this.setState({
            errors: errors
        });

       return errors;
               
    }

    componentDidMount() {
        Promise.all([
            fetch('http://localhost:5000/api/users').then(value=> value.json()),
            fetch(`http://localhost:5000/api/projects/${this.props.match.params.id}`).then(value=> value.json()),
            ]).then((response) => {
                this.setState({
                    users: response[0],
                    project: response[1],
                    projectId: response[1].id
                    
                });
            }).catch(error => console.log(error));
    }

    handleSubmit = (event) => {
        const {name,loggedBy,description,severity, projectId, resolved} = this.state;
        event.preventDefault();
        if (this.validateForm().length < 1) {
            fetch('http://localhost:5000/api/issues',{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, description, loggedBy, severity, projectId, resolved})
            }).then(response => {
                response.json();
                if (response.status === 201) {
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
                severity: '',
            });
        }
    }

    render() {
        return (
            <div>
                 <nav aria-label="breadcrumb" className="mt-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item mx-auto" aria-current="page"><h1><Link to="/">Projects</Link> / <Link to={`/project/${this.state.project.id}`}>{this.state.project.name}</Link> / Add Issue</h1></li>
                    </ol>
                </nav>
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
                            <label>Severity
                                <select className="form-control" value={this.state.severity} onChange={this.handleChange} name="severity">
                                    <option> </option> 
                                    <option>Low</option>    
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </label>
                        </div>
                        <input type="hidden" name="projectId" value={this.state.projectId} onChange={this.handleChange}/>
                        <div className="row justify-content-center">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
                    </form>
                    {this.state.success ? <div className='alert mt-3 alert-success'>Issue Created!</div> : null}
                    {this.state.failed ? <div className='alert mt-3 alert-danger'>Oops Something Went Wrong</div> : null}
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import Breadcrumb from './Breadcrumb'
import {Link} from 'react-router-dom'

export default class CreateProject extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: '',
            assignedTo: '',
            users: [],
            description: '',
            dateAssigned: '' ,
            projectId: '',
            project: {}
        }
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
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
        const {name,assignedTo,description,dateAssigned, projectId} = this.state;
        event.preventDefault();
        fetch('http://localhost:5000/api/tasks',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, description, assignedTo, dateAssigned, projectId})
        }).then(response => response.json())
        .catch(error => console.log(error));

        this.setState({
            name: '',
            assignedTo: '',
            description: '',
            dateAssigned: '',
        });
    }

    render() {
        return (
            <div>
                 <nav aria-label="breadcrumb" className="mt-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item mx-auto" aria-current="page"><h1><Link to="/">Projects</Link> / <Link to={`/project/${this.state.project.id}`}>{this.state.project.name}</Link> / Add Task</h1></li>
                    </ol>
                </nav>
                <div className="mx-auto text-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row justify-content-center">
                            <label>
                                Task Name
                                <input placeholder="Task Name" className="form-control" type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Task Description
                                <textarea placeholder="Enter a short task description" maxLength="200" cols="50" rows="4" className="form-control" value={this.state.description} name="description" onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                               Assigned User
                                <select name="assignedTo" className="form-control" value={this.state.assignedTo} onChange={this.handleChange}>
                                    <option> </option>
                                    {this.state.users.map(user => {
                                        return <option key={user.id}>{user.name}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>Created Date
                                <input type="date" className="form-control" value={this.state.dateAssigned} onChange={this.handleChange} name="dateAssigned" />
                            </label>
                        </div>
                        <input type="hidden" name="projectId" value={this.state.projectId} onChange={this.handleChange}/>
                        <div className="row justify-content-center">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

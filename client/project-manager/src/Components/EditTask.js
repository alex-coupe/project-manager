import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Breadcrumb from './Breadcrumb'

export default class EditTask extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            description: '',
            users: [],
            assignedTo: '',
            dateAssigned: '',
            completed: '',
            completedDate: '',
            task: {},
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
              
        if (this.state.assignedTo === '') {
             errors.push('Assigned To Is Required');
        }
               
        if (this.state.description === '') { 
            errors.push('Description Is Required'); 
        }
              
        if (this.state.dateAssigned === '') {
             errors.push('Date Assigned Is Required'); 
        }

        if (this.state.completed === 'true' && this.state.completedDate === '' ) {
            errors.push('Must Confirm Date Completed');
        }

        this.setState({
            errors: errors
        });

       return errors;
               
    }

    componentDidMount() {
        Promise.all([
        fetch(`http://localhost:5000/api/Tasks/${this.props.match.params.id}`).then(value=> value.json()),
        fetch('http://localhost:5000/api/users').then(value=> value.json())
        ]).then((response) => {
            this.setState({
                Task: response[0],
                users: response[1],
                name: response[0].name,
                assignedTo: response[0].assignedTo,
                description: response[0].description,
                dateAssigned: response[0].dateAssigned,
                completed: response[0].completed,
                id: response[0].id,
                projectId: response[0].projectId
            });
        }).catch(error => console.log(error));
    }

    handleSubmit = (event) => {
        const {name,assignedTo,description,dateAssigned, completed, completedDate, id, projectId} = this.state;
        event.preventDefault();
        if (this.validateForm().length < 1) {
            fetch(`http://localhost:5000/api/tasks/${this.props.match.params.id}`,{
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, description, assignedTo, dateAssigned, completed, completedDate, id, projectId})
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
                assignedTo: '',
                description: '',
                dateAssigned: '',
                completed: false,
                completedDate: '',
            });
        
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb name='Edit Task'/>
                <div className="mx-auto text-center">
                {this.state.errors.length > 0 && this.state.errors.map((error, i) => {
                    return (<div className='alert alert-danger' key={i}>{error}</div>)
                })}
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
                                Assigned To
                                <select name="assignedTp" className="form-control" value={this.state.assignedTo} onChange={this.handleChange}>
                                    <option> </option>
                                    {this.state.users.map(user => {
                                        return <option key={user.id}>{user.name}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Assigned Date
                                <input type="text" value={this.state.dateAssigned} name="dateAssigned" className="form-control" disabled /> 
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Completed
                                <select name="completed" className="form-control" value={this.state.completed} onChange={this.handleChange}>
                                    <option></option>
                                    <option>true</option>
                                    <option>false</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Date Completed
                                <input type="date" className="form-control" value={this.state.completedDate} onChange={this.handleChange} name="completedDate" />
                            </label>
                        </div>
                        <div className="row justify-content-center">
                            <input type="submit" className="btn btn-secondary" value="Update" />
                        </div>
                    </form>
                    {this.state.success ? <div className='alert mt-3 alert-success'>Task Updated!</div> : null}
                    {this.state.failed ? <div className='alert mt-3 alert-danger'>Oops Something Went Wrong</div> : null}
                    <Link className="text-white float-right btn btn-primary" to={`/project/${this.state.projectId}`}> Back </Link>
                </div>
            </div>
        )
    }
}

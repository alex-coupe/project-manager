import React, { Component } from 'react'
import Breadcrumb from './Breadcrumb'
import {Link} from 'react-router-dom'

export default class EditProject extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            owner: '',
            users: [],
            description: '',
            createdDate: '',
            completed: '',
            completionDate: '',
            project: {},
            id: '',
            errors : [],
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
              
        if (this.state.owner === '') {
             errors.push('Owner Is Required');
        }
               
        if (this.state.description === '') { 
            errors.push('Description Is Required'); 
        }
              
        if (this.state.createdDate === '') {
             errors.push('Created Date Is Required'); 
        }

        if (this.state.completed === 'true' && this.state.completionDate === '' ) {
            errors.push('Must Confirm Completion Date');
        }

        this.setState({
            errors: errors
        });

       return errors;
               
    }

    componentDidMount() {
        Promise.all([
        fetch(`http://localhost:5000/api/projects/${this.props.match.params.id}`).then(value=> value.json()),
        fetch('http://localhost:5000/api/users').then(value=> value.json())
        ]).then((response) => {
            this.setState({
                project: response[0],
                users: response[1],
                name: response[0].name,
                owner: response[0].owner,
                description: response[0].description,
                createdDate: response[0].createdDate,
                completed: response[0].completed,
                id: response[0].id
            });
        }).catch(error => console.log(error));
    }

    handleSubmit = (event) => {
        const {name,owner,description,createdDate, completed, completionDate, id} = this.state;
        event.preventDefault();
        if (this.validateForm().length < 1) {
            fetch(`http://localhost:5000/api/projects/${this.props.match.params.id}`,{
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, description, owner, createdDate, completed, completionDate, id})
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
                owner: '',
                description: '',
                createdDate: '',
                completed: false,
                completionDate: '',
            });
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb name='Edit Project'/>
                <div className="mx-auto text-center">
                {this.state.errors.length > 0 && this.state.errors.map((error, i) => {
                    return (<div className='alert alert-danger' key={i}>{error}</div>)
                })}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row justify-content-center">
                            <label>
                                Project Name
                                <input placeholder="Project Name" className="form-control" type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Project Description
                                <textarea placeholder="Enter a short project description" maxLength="200" cols="50" rows="4" className="form-control" value={this.state.description} name="description" onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Owner
                                <select name="owner" className="form-control" value={this.state.owner} onChange={this.handleChange}>
                                    <option> </option>
                                    {this.state.users.map(user => {
                                        return <option key={user.id}>{user.name}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="form-group row justify-content-center">
                            <label>
                                Created Date
                                <input type="text" value={this.state.createdDate} name="createdDate" className="form-control" disabled /> 
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
                                <input type="date" className="form-control" value={this.state.completionDate} onChange={this.handleChange} name="completionDate" />
                            </label>
                        </div>
                        <div className="row justify-content-center">
                            <input type="submit" className="btn btn-secondary" value="Update" />
                        </div>
                    </form>
                    {this.state.success ? <div className='alert mt-3 alert-success'>Project Updated!</div> : null}
                    {this.state.failed ? <div className='alert mt-3 alert-danger'>Oops Something Went Wrong</div> : null}
                    <Link className="text-white float-right btn btn-primary" to={`/project/${this.state.id}`}> Back </Link>
                </div>
            </div>
        )
    }
}

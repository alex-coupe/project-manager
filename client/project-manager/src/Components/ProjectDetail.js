import React, { Component } from 'react'
import Breadcrumb from './Breadcrumb'
import Card from './Card'
import {Link} from 'react-router-dom'
import {issuesFilterOptions, issuesTableOptions} from '../Util/IssuesConfig'
import {tasksFilterOptions, tasksTableOptions} from '../Util/TasksConfig'
import FilterBar from './FilterBar'

export default class ProjectDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            taskList: [],
            project: {},
            issuesList: [],
            fetchingTasks: true,
            fetchingIssues: true,
            deletedProject: false
        }
    }

    componentDidMount() {

        Promise.all([
            fetch(`http://localhost:5000/api/projects/tasks/${this.props.match.params.id}`).then(value=> value.json()),
            fetch(`http://localhost:5000/api/projects/${this.props.match.params.id}`).then(value=> value.json()),
            fetch(`http://localhost:5000/api/projects/issues/${this.props.match.params.id}`).then(value=> value.json())
            ]).then((response) => {
                this.setState({
                    taskList: response[0],
                    fetchingTasks: false,
                    project: response[1],
                    issuesList: response[2],
                    fetchingIssues: false
                });
            }).catch(error => console.log(error));
    }

    deleteProject = () => {
        fetch(`http://localhost:5000/api/projects/${this.state.project.id}`,
        {
            method:'DELETE'
        }).then(response => response.json())
        .catch(error => console.log(error));
        this.setState({
            deletedProject: true
        })
    }

    render() {

       const {createdDate,description,name,completionDate,completed,id} = this.state.project;

        return (
            <div>   
              <Breadcrumb name={name} />
                <div className="mt-3">
                    <p className="text-center">{description}</p>
                    <p className="text-center"><strong>Created: </strong>{createdDate}</p>
                    {completed ? <p className="text-center"><strong>Completed: </strong>{completionDate}</p> : null}
                    {this.state.deletedProject ? null : <span> <button onClick={this.deleteProject} className="btn btn-danger mr-3 mb-3">Delete Project</button></span>}
                    {this.state.deletedProject ? null : <span> <Link to={`/editproject/${id}`} className="btn mb-3 btn-secondary text-white">Edit Project</Link></span>} 
                    <span><Link className="text-white float-right ml-3 mb-3 btn btn-primary" to="/"> Back </Link></span>
                    {this.state.deletedProject ? null :
                    <Card name={'Tasks'}  size={this.state.taskList.length} buttonText={'Add New Task'} link={`/createtask/${id}`}>
                        <FilterBar name='tasks' fetching={this.state.fetchingTasks} recordsPerPage={2} withFilter={true} data={this.state.taskList} filterOptions={tasksFilterOptions} tableHeaderOptions={tasksTableOptions} />
                    </Card>}
                    {this.state.deletedProject ? null :
                    <Card name={'Issues'} size={this.state.issuesList.length} buttonText={'Add New Issue'} link={`/createissue/${id}`}>
                        <FilterBar name='issues' fetching={this.state.fetchingIssues} recordsPerPage={2} withFilter={true} data={this.state.issuesList} filterOptions={issuesFilterOptions} tableHeaderOptions={issuesTableOptions} />
                    </Card>}
                  
                </div>
            </div>
        )
    }
}

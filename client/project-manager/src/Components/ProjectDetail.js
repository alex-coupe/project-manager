import React, { Component } from 'react'
import Breadcrumb from './Breadcrumb'
import Card from './Card'
import {Link} from 'react-router-dom'
import {issuesFilterOptions, issuesTableOptions} from '../Util/IssuesConfig'
import {tasksFilterOptions, tasksTableOptions} from '../Util/TasksConfig'
import FilterBar from './FilterBar'
import { NavLink } from 'react-router-dom'

export default class ProjectDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            taskList: [],
            project: {},
            issuesList: [],
            fetchingTasks: true,
            fetchingIssues: true,
            redirect: false
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
                    <Card name={'Tasks'}  size={this.state.taskList.length} buttonText={'Add New Task'} link={`/createtask/${id}`}>
                        <FilterBar fetching={this.state.fetchingTasks} recordsPerPage={2} withFilter={true} data={this.state.taskList} filterOptions={tasksFilterOptions} tableHeaderOptions={tasksTableOptions} />
                    </Card>
                    <Card name={'Issues'} size={this.state.issuesList.length} buttonText={'Add New Issue'} link={'/createissue'}>
                        <FilterBar fetching={this.state.fetchingIssues} recordsPerPage={2} withFilter={true} data={this.state.issuesList} filterOptions={issuesFilterOptions} tableHeaderOptions={issuesTableOptions} />
                    </Card>
                   <button onClick={this.deleteProject} className="float-right btn btn-danger mb-3 "><NavLink to="/" className="text-white">Delete Project</NavLink></button>
                   <Link to={`/editproject/${id}`} className="float-right btn mr-3 btn-secondary text-white">Edit Project</Link>
                </div>
            </div>
        )
    }
}

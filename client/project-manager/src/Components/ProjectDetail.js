import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Breadcrumb from './Breadcrumb'

export default class ProjectDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            taskList: [],
            project: {},
            issuesList: [],
            fetchingTasks: true,
            fetchingIssues: true
        }
    }

    componentDidMount() {

        Promise.all([
            fetch(`http://localhost:5000/api/tasks/${this.props.match.params.id}`).then(value=> value.json()),
            fetch(`http://localhost:5000/api/projects/${this.props.match.params.id}`).then(value=> value.json()),
            fetch(`http://localhost:5000/api/issues/${this.props.match.params.id}`).then(value=> value.json())
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

    render() {
        return (
            <div>   
              <Breadcrumb name={this.state.project.name} />
                <div className="mt-5">
                    <div id="overview" className="card" style={{width: 'auto'}}>
                        <h2 className="card-header text-center"><FontAwesomeIcon icon={faEdit}/> 
                            Tasks <span className="badge badge-dark">{this.state.taskList.length}</span></h2>
                        <div className="card-body" style={{backgroundColor: "#fff6db"}}>
                        <button className="btn btn-primary mx-auto" style={{display: 'block'}}>Add Task</button>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div id="overview" className="card" style={{width: 'auto'}}>
                            <h2 className="card-header text-center"><FontAwesomeIcon icon={faEdit}/> 
                             Issues <span className="badge badge-dark">{this.state.issuesList.length}</span></h2>
                            <div className="card-body" style={{backgroundColor: "#fff6db"}}>
                            <button className="btn btn-primary mx-auto" style={{display: 'block'}}>Add Issue</button>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}

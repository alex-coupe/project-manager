import React, { Component } from 'react'
import Breadcrumb from './Breadcrumb'
import Card from './Card'

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
                    <Card name={'Tasks'} size={this.state.taskList.length} buttonText={'Add New Task'}/>
                    <Card name={'Issues'} size={this.state.issuesList.length} buttonText={'Add New Issue'} />
                </div>
            </div>
        )
    }
}

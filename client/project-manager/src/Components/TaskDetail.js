import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class TaskDetail extends Component {

    constructor(props){
        super(props)

        this.state={
            fetchingTasks: true,
            project: {},
            task: {}
        }
    }

    componentDidMount() {
        Promise.all([
            fetch(`http://localhost:5000/api/tasks/${this.props.match.params.id}`).then(value=> value.json()),
            fetch(`http://localhost:5000/api/projects/17`).then(value=> value.json()),
            ]).then((response) => {
                this.setState({
                    task: response[0],
                    fetchingTasks: false,
                    project: response[1],
                });
            }).catch(error => console.log(error));
    }

    render() {
        const {task,project} = this.state;
        return (
            <div>
                <nav aria-label="breadcrumb" className="mt-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item mx-auto" aria-current="page"><h1><Link to="/">Projects</Link> / <Link to={`/project/${task.projectId}`}>{project.name}</Link> / {task.name}</h1></li>
                    </ol>
                </nav>
            </div>
        )
    }
}

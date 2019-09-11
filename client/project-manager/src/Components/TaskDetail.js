import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class TaskDetail extends Component {

    constructor(props){
        super(props)

        this.state={
            task: {},
            deletedTask: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/tasks/${this.props.match.params.id}`)
        .then(response => response.json())
        .then (json => {
            this.setState({
                task: json,
            });
        })
        .catch(error => console.log(error)
        );
    }

    deleteTask = () => {
        this.setState({
            deletedTask: true
        });
        fetch(`http://localhost:5000/api/tasks/${this.state.task.id}`,
        {
            method:'DELETE'
        }).then(response => response.json())
        .catch(error => console.log(error));
    }

    render() {
        const {task,deletedTask} = this.state;
        return (
            <div>
                <nav aria-label="breadcrumb" className="mt-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item mx-auto" aria-current="page"><h1>{task.name}</h1></li>
                    </ol>
                </nav>
                <p className="text-center"><strong>Description: </strong> {task.description}</p>
                <p className="text-center"><strong>Assigned To: </strong>{task.assignedTo}</p>
                <p className="text-center"><strong>Date Assigned: </strong>{task.dateAssigned}</p>
                {task.completed ? <p className="text-center"><strong>Completion Date: </strong>{task.completedDate}</p> :<p className="text-center"><strong>Completed: </strong>Not Complete</p>}
                {deletedTask ? null : <span className="text-center"><button onClick={this.deleteTask} className="btn btn-danger mr-3">Delete Task</button></span>}
                {deletedTask ? null : <span><Link to={`/edittask/${task.id}`} className="btn btn-secondary text-white">Edit Task</Link></span>}
                <Link className="text-white float-right btn btn-primary" to={`/project/${task.projectId}`}> Back </Link>
            </div>
        )
    }
}

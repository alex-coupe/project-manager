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
                {deletedTask ? null : <p className="text-center"><button onClick={this.deleteTask} className="btn btn-danger mr-3 mb-3">Delete Task</button></p>}
                {deletedTask ? null : <Link to={`/edittask/${task.id}`} className="btn mb-3 btn-secondary text-white">Edit Task</Link>}
                <Link className="text-white btn btn-primary" to={`/project/${task.projectId}`}> Back </Link>
            </div>
        )
    }
}

import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'

export default class TaskDetail extends Component {

    constructor(props){
        super(props)

        this.state={
            task: {}
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
        fetch(`http://localhost:5000/api/tasks/${this.state.task.id}`,
        {
            method:'DELETE'
        }).then(response => response.json())
        .catch(error => console.log(error));
    }

    render() {
        const {task} = this.state;
        return (
            <div>
                <nav aria-label="breadcrumb" className="mt-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item mx-auto" aria-current="page"><h1>{task.name}</h1></li>
                    </ol>
                </nav>
                <p className="text-center"><button onClick={this.deleteTask} className="btn btn-danger mr-3 mb-3"><NavLink to={`/project/${task.projectId}`} className="text-white">Delete Task</NavLink></button>
                <Link to={`/edittask/${task.id}`} className="btn mb-3 btn-secondary text-white">Edit Task</Link></p>
                <button className="btn btn-primary"><Link className="text-white" to={`/project/${task.projectId}`}> Back </Link></button>
            </div>
        )
    }
}

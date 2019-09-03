import React, { Component } from 'react'
import FilterBar from './FilterBar'
import {tasksFilterOptions, tasksTableOptions} from '../Util/TasksConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default class Tasks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            taskList: [],
            fetchingTasks: true
        }

    }

    componentDidMount() {
        fetch('http://localhost:5000/api/tasks')
        .then(response => response.json())
        .then (json => {
            this.setState({
                taskList: json
            });
        })
        .catch(error => console.log(error)
        );
        this.setState({
            fetchingTasks: false
        });
    }

    render() {
 
        return (
            <div >
                <div className="mt-5">
                    <div id="overview" className="card" style={{width: 'auto'}}>
                        <h2 className="card-header text-center" style={{backgroundColor: "#ebf2fc"}}><FontAwesomeIcon icon={faEdit}/> 
                         Tasks <span className="badge badge-dark">{this.state.taskList.length}</span></h2>
                        <div className="card-body" style={{backgroundColor: "#fff6db"}}>
                            <FilterBar fetching={this.state.fetchingTasks} recordsPerPage={2} withFilter={true} data={this.state.taskList} filterOptions={tasksFilterOptions} tableHeaderOptions={tasksTableOptions} />
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}
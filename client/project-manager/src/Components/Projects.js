import React, { Component } from 'react'
import FilterBar from './FilterBar'
import {projectFilterOptions, projectTableOptions} from '../Util/ProjectsConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default class Projects extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projectList: [],
            fetchingProjects: true
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/projects')
        .then(response => response.json())
        .then (json => {
            this.setState({
                projectList: json,
                fetchingProjects: false
            });
        })
        .catch(error => console.log(error)
        );
    }

    render() {
        return (
            <div >
                <div className="mt-5">
                    <div id="overview" className="card" style={{width: 'auto'}}>
                        <h2 className="card-header text-center"><FontAwesomeIcon icon={faEdit}/> 
                         Projects <span className="badge badge-dark">{this.state.projectList.length}</span></h2>
                        <div className="card-body" style={{backgroundColor: "#fff6db"}}>
                            <FilterBar fetching={this.state.fetchingProjects} recordsPerPage={2} withFilter={true} data={this.state.projectList} filterOptions={projectFilterOptions} tableHeaderOptions={projectTableOptions} />
                        </div>
                        <button className="btn btn-primary mx-auto mb-3">Create New Project</button>
                    </div> 
                </div>
            </div>
        )
    }
}

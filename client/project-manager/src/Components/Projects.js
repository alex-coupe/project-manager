import React, { Component } from 'react'
import FilterBar from './FilterBar'
import {projectFilterOptions, projectTableOptions} from '../Util/ProjectsConfig'
import Card from './Card'
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
                    <Card name={'Projects'} size={this.state.projectList.length} buttonText={'Create New Project'} link={'/createproject'}>
                        <FilterBar fetching={this.state.fetchingProjects} recordsPerPage={2} withFilter={true} data={this.state.projectList} filterOptions={projectFilterOptions} tableHeaderOptions={projectTableOptions} />
                    </Card> 
                </div>
            </div>
        )
    }
}

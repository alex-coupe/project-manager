import React, { Component } from 'react'

export default class Projects extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ProjectList: [],
            fetchingTasks: true
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/projects')
        .then(response => response.json())
        .then (json => {
            this.setState({
                projectList: json
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
            <div>
                
            </div>
        )
    }
}

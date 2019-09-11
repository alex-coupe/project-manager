import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class IssueDetail extends Component {

    constructor(props){
        super(props)

        this.state={
            issue: {},
            deletedissue: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/issues/${this.props.match.params.id}`)
        .then(response => response.json())
        .then (json => {
            this.setState({
                issue: json,
            });
        })
        .catch(error => console.log(error)
        );
    }

    deleteissue = () => {
        this.setState({
            deletedissue: true
        });
        fetch(`http://localhost:5000/api/issues/${this.state.issue.id}`,
        {
            method:'DELETE'
        }).then(response => response.json())
        .catch(error => console.log(error));
    }

    render() {
        const {issue,deletedissue} = this.state;
        return (
            <div>
                <nav aria-label="breadcrumb" className="mt-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item mx-auto" aria-current="page"><h1>{issue.name}</h1></li>
                    </ol>
                </nav>
                <p className="text-center"><strong>Description: </strong> {issue.description}</p>
                <p className="text-center"><strong>Logged By: </strong>{issue.loggedBy}</p>
                <p className="text-center"><strong>Severity: </strong>{issue.severity}</p>
                {issue.resolved ? <p className="text-center"><strong>Resolved: </strong>{issue.resolvedBy}</p> : <p className="text-center"><strong>Resolved: </strong>Not Resolved</p>}
                {deletedissue ? null : <span className="text-center"><button onClick={this.deleteissue} className="btn btn-danger mr-3">Delete issue</button></span>}
                {deletedissue ? null : <span><Link to={`/editissue/${issue.id}`} className="btn btn-secondary text-white">Edit issue</Link></span>}
                <Link className="text-white float-right btn btn-primary" to={`/project/${issue.projectId}`}> Back </Link>
            </div>
        )
    }
}

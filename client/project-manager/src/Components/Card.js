import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

export default class Card extends Component {
    render() {
        return (
            <div>
                <div id="overview" className="card mb-3 d-flex justify-content-between" style={{width: 'auto'}}>
                    <h2 className="card-header text-center"><FontAwesomeIcon icon={faEdit}/> 
                        {this.props.name} <span className="badge badge-dark">{this.props.size}</span></h2>
                    <div className="card-body text-center" style={{backgroundColor: "#f7f7f7"}}>
                        <div>{this.props.children}</div>
                        <Link className="btn btn-primary text-white" to={this.props.link}>{this.props.buttonText}</Link>
                    </div>
                </div>
            </div>
        )
    }
}

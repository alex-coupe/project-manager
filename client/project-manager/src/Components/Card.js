import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default class Card extends Component {
    render() {
        return (
            <div>
                <div id="overview" className="card" style={{width: 'auto'}}>
                    <h2 className="card-header text-center"><FontAwesomeIcon icon={faEdit}/> 
                        {this.props.name} <span className="badge badge-dark">{this.props.size}</span></h2>
                    <div className="card-body" style={{backgroundColor: "#fff6db"}}>
                    <button className="btn btn-primary mx-auto" style={{display: 'block'}}>{this.props.buttonText}</button>
                    </div>
                </div>
            </div>
        )
    }
}

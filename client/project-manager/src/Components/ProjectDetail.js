import React, { Component } from 'react'

export default class ProjectDetail extends Component {
    render() {
        return (
            <div>
                <h1>Hello {this.props.match.params.id}</h1>
            </div>
        )
    }
}

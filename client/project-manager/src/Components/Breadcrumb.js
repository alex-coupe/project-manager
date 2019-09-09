import React from 'react'
import {Link} from 'react-router-dom'
export default function Breadcrumb(props) {
    return (
        <div>
            <nav aria-label="breadcrumb" className="mt-3">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item mx-auto" aria-current="page"><h1><Link to="/">Projects</Link>/ {props.name}</h1></li>
                </ol>
            </nav>
        </div>
    )
}

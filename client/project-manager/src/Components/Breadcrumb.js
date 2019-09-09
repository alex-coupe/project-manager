import React from 'react'

export default function Breadcrumb(props) {
    return (
        <div>
            <nav aria-label="breadcrumb" className="mt-3">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item mx-auto" aria-current="page"><h1><a href="/">Projects</a>/ {props.name}</h1></li>
                </ol>
            </nav>
        </div>
    )
}

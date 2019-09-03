import React from 'react'
import PropTypes from 'prop-types'

export default function TopBar(props) {
    return (
        <div data-testid="topbar">
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
             <h3 className="text-white ml-5 mb-0">Project Manager</h3>
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul className="navbar-nav ml-auto">
                     <li className="nav-item nav-link active">
                         <h3>Welcome, {props.user}</h3>
                     </li>
                 </ul>
             </div>
         </nav>
     </div>
     )
 }


TopBar.propTypes = {
 user: PropTypes.string
};

import React from 'react'

export default function Spinner() {
    return (
        <div className="d-flex justify-content-center m-5" data-testid='spinner'>
            <div className="spinner-border" role="status">
               <h3>Loading...</h3>
            </div>
      </div>
    )
}

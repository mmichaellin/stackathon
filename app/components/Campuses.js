import React from 'react'
import { Link } from 'react-router-dom'

const Campuses = (props) => {
  const campuses = props.campuses || []
  const deleter = props.deleteCampus
  return (
    <div id='campuses' className='column'>
      {campuses.length > 0 ?
        (
          campuses.map(campus => (
            <div className='campus' key={campus.id}>
              <Link to={`/campus/${campus.location}`}>
                <h3>{campus.location}</h3>
              </Link>
              <div>
                <button onClick={() => deleter(campus.location)} >Remove</button>
              </div>
            </div>
          ))
        ) :
        <h1>Please add a Campus. Why are there no campuses??</h1>
      }
    </div>
  )
}

export default Campuses

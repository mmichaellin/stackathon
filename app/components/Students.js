import React from 'react'
import { Link } from 'react-router-dom'

const Students = (props) => {
  const students = props.students || []
  const deleter = props.deleteStudent
  return (
    <div id='students' className='column'>
      {
        students.map(student => (
          <div className='student' key={student.id}>
            <Link to={`/student/${student.name}`}>
              <h3>{student.name}</h3>
            </Link>
            <div>
              <button onClick={() => deleter(student.name)} >Remove</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Students

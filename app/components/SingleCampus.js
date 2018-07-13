import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class SingleCampus extends Component {
  constructor() {
    super()
    this.state = {
      campus: {},
      students: []
    }
    this.removeCampus = this.removeCampus.bind(this)
  }
  async componentDidMount() {
    try {
      const location = this.props.match.params.location
      const res = await axios.get(`/api/campuses/${location}`)
      const res2 = await axios.get(`/api/campuses/${location}/students`)
      this.setState({
        campus: res.data[0],
        students: res2.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  removeCampus = async function(location){
    await axios.delete(`/api/campuses/${location}`)
    this.props.history.push('/')
  }

  render() {
    const campus = this.state.campus
    const students = this.state.students
    if (campus === undefined){
      return(
        <h1>This campus is temporarily closed.</h1>
      )
    }
    return (
      <React.Fragment>
        <div id='single-campus' className='column'>
          <h1>{campus.location}</h1>
          <h3>{campus.content}</h3>
          <img src={campus.imageUrl} />
          <Link to= {`/campus/${campus.location}/editcampus`} >Edit</Link>
          <button onClick={()=>this.removeCampus(campus.location)} >Remove Campus</button>
        </div>
        {students.length > 0 ?
          (students.map(student => (
            <div className='studentRow' key={students.id}>
              <h2>{student.name}</h2>
              <h3>GPA:{student.GPA}</h3>
              <Link to={`/student/${student.name}`}>{student.name} Profile</Link>
            </div>
          ))):
          <h1>There are no students enrolled in this campus.</h1>
        }
      </React.Fragment>
    )
  }
}

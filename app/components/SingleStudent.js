import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleStudent extends Component {
  constructor() {
    super()
    this.state = {
      student: {},
      allCampuses: []
    }
    this.removeStudent = this.removeStudent.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    try {
      const name = this.props.match.params.studentName
      const res = await axios.get(`/api/students/${name}`)
      //res gets data for the specific student
      const res2 = await axios.get(`/api/campuses`)
      //res2 gets data for all campuses to filter later on
      this.setState({
        student: res.data[0],
        allCampuses: res2.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  removeStudent = async function (name) {
    await axios.delete(`/api/students/${name}`)
    this.props.history.push('/students')
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const name = this.props.match.params.studentName
      const campus = this.state.campusName
      const updated = await axios.put(`/api/students/${name}/${campus}`, this.state)
      this.setState({
        student: updated.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const studentInfo = this.state.student
    const otherCampuses = this.state.allCampuses.filter(obj => {
      return obj.location !== this.state.student.theCampus
    })
    return (
      <div id='single-student' className='column'>
        <h1>{studentInfo.name}</h1>
        <h3>{studentInfo.theCampus}</h3>
        <h3>GPA:{studentInfo.GPA}</h3>
        <img src={studentInfo.pic} />
        <Link to={`/student/${studentInfo.name}/editstudent`}>Edit</Link>
        <br />
        <Link to={`/campus/${studentInfo.theCampus}`}>{studentInfo.theCampus}</Link>
        <br />
        <button onClick={() => this.removeStudent(studentInfo.name)} >Remove Student</button>
        <form >
          <select onChange={this.handleChange} name='campusName' >
            <option>Select a Campus</option>
            {
              otherCampuses.map(campus => (
                <option
                  value={campus.location}
                >{campus.location}</option>
              ))
            }
          </select>
          <button type='submit' onClick={this.handleSubmit} >Add To Campus</button>
        </form>
      </div>
    )
  }
}

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class EditCampus extends Component {
  constructor() {
    super()
    this.state = {
      location: '',
      content: '',
      imageUrl: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.campusChangeSubmit = this.campusChangeSubmit.bind(this)
  }
  async componentDidMount() {
    try {
      const location = this.props.match.params.location
      const res = await axios.get(`/api/campuses/${location}`)
      const res2 = await axios.get(`/api/campuses/${location}/students`)
      const res3 = await axios.get(`/api/students`)
      this.setState({
        campus: res.data[0],
        students: res2.data,
        allStudents: res3.data
      })
    } catch (err) {
      console.log(err)
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const currentLocation = this.props.match.params.location
      await axios.put(`/api/campuses/${currentLocation}`, this.state)
      // console.log(this.state)
      // await axios.put(`/api/students/`)
      // please elegantly handle students who have no campus
      this.setState({
        location: '',
        content: '',
        imageUrl: ''
      })
      this.props.history.push('/');
    } catch (err) {
      console.log(err)
    }
  }
  campusChangeSubmit = async (event) => {
    event.preventDefault();
    try {
      const currentLocation = this.props.match.params.location
      const studentToChange = this.state.studentName
      const updated = await axios.put(`/api/students/${studentToChange}/${currentLocation}`, this.state)
      this.setState({
        students: [...this.state.students, updated.data],
        allStudents: this.state.allStudents.filter(element => {
          return element.name !== studentToChange
        })
      })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const students = this.state.students || []
    const allStudents = this.state.allStudents || []
    const studentsNotOnCampus = allStudents.filter(obj => {
      return obj.theCampus !== this.props.match.params.location
    })

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>Campus Name:</label>
          <input
            name='location'
            type='text'
            value={this.state.location}
            onChange={this.handleChange}
            required
          />
          <br />
          <label>Info:</label>
          <input
            name='content'
            type='text'
            value={this.state.content}
            onChange={this.handleChange}
            required
          />
          <br />
          <label>Image:</label>
          <input
            name='imageUrl'
            type='text'
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
          <br />
          <button type='submit'>Submit</button>
        </form>
        <form >
          <select onChange={this.handleChange} name='studentName' >
          <option>Select a Student</option>
            {
              studentsNotOnCampus.map(student => (
                <option
                value={student.name}
                >{student.name}</option>
              ))
            }
          </select>
          <button type='submit' onClick={this.campusChangeSubmit} >Change Campus</button>
          {/* <input type='submit' onClick={this.campusChangeSubmit} /> */}
        </form>
        <h2>Students enrolled:</h2>
        {students.length > 0 ?
          (students.map(student => (
            <div className='studentRow' key={students.id}>
              <h2>{student.name}</h2>
              <h3>GPA:{student.GPA}</h3>
              <Link to={`/student/${student.name}`}>{student.name} Profile</Link>
            </div>
          ))) :
          <h1>There are no students enrolled in this campus.</h1>
        }
      </React.Fragment>
    )
  }
}

import React, { Component } from 'react';
import axios from 'axios'
import Students from './Students'
import {Link} from 'react-router-dom'

export default class AllStudents extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    }
    this.deleteStudent = this.deleteStudent.bind(this)
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/students')
      this.setState({
        students: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  deleteStudent = async function(name){
    this.setState({
      students: this.state.students.filter(obj => {
        return obj.name !== name
      })
    })
    await axios.delete(`/api/students/${name}`)
  }

  render() {
    return (
      <React.Fragment>
        <Link to='addStudent'>Add Student</Link>
        <Students students={this.state.students} deleteStudent={this.deleteStudent}/>
      </React.Fragment>
    )
  }
}

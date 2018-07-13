import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class SingleStudent extends Component {
  constructor(){
    super()
    this.state ={
      student: {}
    }
    this.removeStudent = this.removeStudent.bind(this)
  }
  async componentDidMount(){
    try{
      const name = this.props.match.params.studentName
      const res = await axios.get(`/api/students/${name}`)
      this.setState({
        student: res.data[0]
      })
    } catch (err) {
      console.log(err)
    }
  }

  removeStudent = async function(name){
    await axios.delete(`/api/students/${name}`)
    this.props.history.push('/students')
  }

  render(){
    const studentInfo = this.state.student
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
      <button onClick={()=>this.removeStudent(studentInfo.name)} >Remove Student</button>
      </div>
    )
  }
}

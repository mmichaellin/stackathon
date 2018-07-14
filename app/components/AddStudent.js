import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AddStudent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      theCampus: '',
      pic: '',
      GPA: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/students', this.state)
      this.setState({
        name: '',
        theCampus: '',
        pic: '',
        GPA: 0
      })
      this.props.history.push('/students')
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Student Name:</label>
        <input
          name='name'
          type='text'
          value={this.state.name}
          onChange={this.handleChange}
        />
        {this.state.name.length === 0 ? <div>Enter a name</div> : null}
        <br />
        <label>Campus</label>
        <input
          name='theCampus'
          type='text'
          value={this.state.theCampus}
          onChange={this.handleChange}
        />
        {this.state.theCampus.length === 0 ? <div>Enter the campus</div> : null}
        <br />
        <label>GPA:</label>
        <input
          name='GPA'
          type='number'
          value={this.state.GPA}
          onChange={this.handleChange}
        />
        {(this.state.GPA < 0 || this.state.GPA > 4) ? <div>GPA must be between 0 and 4</div> : null}
        <br />
        <label>Profile Picture:</label>
        <input
          name='pic'
          type='text'
          value={this.state.pic}
          onChange={this.handleChange}
        />
        <br />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class EditStudent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      theCampus: '',
      GPA: '',
      pic: ''
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
      const currentname = this.props.match.params.name
      const response = await axios.put(`/api/students/${currentname}`, this.state)
      this.setState({
        name: '',
        theCampus: '',
        GPA: '',
        pic: ''
      })
      this.props.history.push('/students');
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
          required
        />
        <br />
        <label>Campus:</label>
        <input
          name='theCampus'
          type='text'
          value={this.state.content}
          onChange={this.handleChange}
          required
        />
        <br />
        <label>GPA:</label>
        <input
          name='GPA'
          type='text'
          value={this.state.GPA}
          onChange={this.handleChange}
          required
        />
        <br />
        <label>Profile Picture Img:</label>
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

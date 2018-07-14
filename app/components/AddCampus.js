import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AddCampus extends Component {
  constructor() {
    super()
    this.state = {
      location: '',
      content: '',
      imageUrl: ''
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
      const location = this.state.location
      const response = await axios.post('/api/campuses', this.state)
      this.setState({
        location: '',
        content: '',
        imageUrl: ''
      })
      this.props.history.push(`/campus/${location}`);
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Campus Name:</label>
        <input
          name='location'
          type='text'
          value={this.state.location}
          onChange={this.handleChange}
        />
        {this.state.location.length === 0 ? <div>Enter the campus</div> : null}
        <br />
        <label>Info:</label>
        <input
          name='content'
          type='text'
          value={this.state.content}
          onChange={this.handleChange}
        />
        {this.state.content.length === 0 ? <div>Enter some info</div> : null}
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
    )
  }
}

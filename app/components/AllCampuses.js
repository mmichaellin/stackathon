import React, { Component } from 'react';
import axios from 'axios'
import Campuses from './Campuses'
import { Link } from 'react-router-dom'

export default class AllCampuses extends Component {
  constructor() {
    super();
    this.state = {
      campuses: []
    }
    this.deleteCampus = this.deleteCampus.bind(this)
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/campuses')
      this.setState({
        campuses: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  deleteCampus = async function (location) {
    this.setState({
      campuses: this.state.campuses.filter(obj => {
        return obj.location !== location
      })
    })
    await axios.delete(`/api/campuses/${location}`)
  }

  render() {
    return (
      <React.Fragment>
        <Link to='/addcampus'>Add Campus</Link>
        <Campuses campuses={this.state.campuses} deleteCampus={this.deleteCampus} />
      </React.Fragment>
    )
  }
}

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div className="nav-bg" >
      <Link to='/' className="btn" >Piano</Link>
      <Link to='/flute' className="btn" >Flute</Link>
      <Link to ='/guitar' className="btn" >Guitar</Link>
      <Link to='/demo' className="btn" >Demo</Link>
      <h1 className="header" >Stackathon Project</h1>
    </div>
  )
}

export default Navbar

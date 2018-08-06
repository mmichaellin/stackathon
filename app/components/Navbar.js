import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div>
      <Link to='/'>Piano</Link>
      <Link to='/flute'>Flute</Link>
      <Link to ='/guitar'>Guitar</Link>
      <Link to='/demo'>Demo</Link>
    </div>
  )
}

export default Navbar

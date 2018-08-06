import React from 'react'
import { render } from 'react-dom'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'


import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Flute from './components/Flute'
import Guitar from './components/Guitar'
import Demo from './components/Demo'

render(
  <Router>
    <div>
      <h1>Stackathon Project</h1>
      {<Navbar />}
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/flute' component={Flute} />
        <Route exact path='/guitar' component={Guitar} />
        <Route exact path='/demo' component={Demo} />
        <Route component={() => <h1>Not Found</h1>} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('main')
  // import { INSPECT_MAX_BYTES } from 'buffer';
)

